<template>
  <UPopover v-model:open="open">
    <UButton
      variant="ghost"
      color="neutral"
      icon="i-ms-question-mark"
      size="sm"
      :aria-label="$t('generator.promptHelp')"
    />
    <template #content>
      <div class="text-sm text-left max-w-[350px] p-4">
        <TH4>Prompt mode keywords:</TH4>
        <p class="content">
          e.g.
          <i>"evil male drow innkeeper rogue cr 6"</i>
        </p>
        <ul class="list-disc list-inside break-normal py-2">
          <li>
            <b>any* race</b> or variant:
            <i>"drow"</i>
          </li>
          <li>
            <b>any* class</b> or variant:
            <i>"rogue"</i>
          </li>
          <li>
            <b>any* background</b>:
            <i>"innkeeper"</i>
          </li>
          <li>
            <b>male</b>, <b>female</b>, <b>nonbinary</b>: defines the pronouns
            used in the stat block
          </li>
          <li>
            <b>cr {number}</b>: challenge rating:
            <i>"cr 6"</i>
          </li>
          <li>
            <b>lawful</b>, <b>chaotic</b>, <b>good</b>, <b>evil</b>,
            <b>neutral</b> alignment:
            <i>"lawful evil"</i>
          </li>
        </ul>
        <p class="mt-4">
          <b>*</b>check the races, classes and backgrounds available in "form"
          mode.
        </p>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const open = ref(false);

const items = [
  {
    slot: "dropdown",
  },
];
</script>

<style scoped></style>
