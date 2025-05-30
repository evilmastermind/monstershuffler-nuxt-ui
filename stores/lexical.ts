import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { createEditor, type LexicalEditor } from "lexical";
import { mergeRegister } from "@lexical/utils";
import { $generateHtmlFromNodes } from "@lexical/html";
// @ts-expect-error something is seriously wrong with PrismJS and Lexical
import Prism from "prismjs";
import { UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { registerHistory } from "@lexical/history";
import { ThrottledFunctionLock } from "@/utils";
import {
  TRANSFORMERS,
  registerMarkdownShortcuts,
  $appendMarkdownString,
  $convertFromMarkdownString,
  $convertToMarkdownString,
} from "@/plugins-other/lexical-markdown";

// TODO: remove lexical-code dependency from lexical-markdown

// @ts-expect-error something is seriously wrong with PrismJS and Lexical
if (typeof globalThis.Prism === "undefined") {
  // @ts-expect-error something is seriously wrong with PrismJS and Lexical
  globalThis.Prism = Prism;
}

export const useLexicalStore = defineStore("lexical", () => {
  let editor: LexicalEditor | null = null;
  const lock = new ThrottledFunctionLock();
  let currentChunk = 0;

  function createLexicalEditor(
    node: HTMLElement,
    theme: Object,
    onUpdate?: (markdown: string) => any
  ) {
    const config = {
      namespace: "text", // TODO: does this need to be unique if multiple editors are on the same page?
      nodes: [
        HeadingNode,
        QuoteNode,
        CodeNode,
        LinkNode,
        ListNode,
        ListItemNode,
      ],
      onError: (error: Error) => {
        throw error;
      },
      theme,
    };

    editor = createEditor(config);

    currentChunk = 0;

    editor.setRootElement(node);
    mergeRegister(registerRichText(editor));
    mergeRegister(registerMarkdownShortcuts(editor, TRANSFORMERS));

    registerHistory(
      editor,
      { current: null, redoStack: [], undoStack: [] },
      1000
    );
    addFocusListeners(node);

    editor.registerUpdateListener(async () => {
      if (!onUpdate) {
        return;
      }
      onUpdate(await toMarkdown());
    });
  }

  function addFocusListeners(node: HTMLElement) {
    node.addEventListener("focusin", () => {
      // CTRL + Z
      node.addEventListener("keydown", (event) => {
        if (editor === null) {
          return;
        }
        if (event.ctrlKey && event.key === "z") {
          event.preventDefault();
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }
      });
      // CTRL + SHIFT + Z
      node.addEventListener("keydown", (event) => {
        if (editor === null) {
          return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "z") {
          event.preventDefault();
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }
      });
    });
    node.addEventListener("focusout", () => {
      // remove keydown event listeners
      node.removeEventListener("keydown", (event) => {
        if (editor === null) {
          return;
        }
        if (event.ctrlKey && event.key === "z") {
          event.preventDefault();
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }
      });
      node.removeEventListener("keydown", (event) => {
        if (editor === null) {
          return;
        }
        if (event.ctrlKey && event.shiftKey && event.key === "z") {
          event.preventDefault();
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }
      });
    });
  }

  function importMarkdown(markdown: string) {
    if (editor === null) {
      return;
    }
    editor.update(() => {
      $convertFromMarkdownString(markdown, TRANSFORMERS);
    });
  }

  async function appendMarkdownChunks(chunks: string[]) {
    // eslint-disable-next-line require-await -- lock.run is async but my function is not
    await lock.run(async () => {
      if (editor === null) {
        return;
      }
      const chunksLength = chunks.length;
      if (chunksLength <= currentChunk) {
        return;
      }
      const lastChunks = chunks.slice(currentChunk, chunksLength);
      editor.setEditable(false);
      editor.update(() => {
        $appendMarkdownString(lastChunks.join(""), TRANSFORMERS);
      });
      editor.setEditable(true);
      currentChunk = chunksLength;
    });
  }

  function toMarkdown(): Promise<string> {
    return new Promise((resolve) => {
      if (!editor) {
        resolve("");
        return;
      }

      editor.update(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        resolve(markdown);
      });
    });
  }

  function toHTML() {
    if (editor === null) {
      return "";
    }
    let html = "";
    editor.update(() => {
      if (editor === null) {
        return;
      }
      html = $generateHtmlFromNodes(editor);
    });
    return html;
  }

  return {
    editor,
    appendMarkdownChunks,
    createLexicalEditor,
    importMarkdown,
    toHTML,
    toMarkdown,
  };
});
