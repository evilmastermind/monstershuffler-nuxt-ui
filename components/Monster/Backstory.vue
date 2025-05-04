<template>
  <div>
    <div class="backstory">
      <EditorText
        :text="backstory"
        :stream-chunks="wrapper.streamChunks"
        :stream-status="wrapper.streamStatus"
        @text-updated="saveBackstory"
      />
      <LoadingDots
        v-if="
          !wrapper.streamChunks.length && wrapper?.streamStatus === 'opening'
        "
      />
      <div
        v-if="
          hooks?.length && wrapper.hook === undefined && !isLoadingGeneration
        "
        class="p-4 border border-accented rounded w-fit break-inside-avoid mt-6"
      >
        <p class="font-[LibreBaskerville]">
          Generate a mini-adventure based on:
        </p>
        <div class="flex gap-2 mt-2">
          <UButton
            v-for="(hook, index) in hooks"
            :key="index"
            variant="outline"
            color="neutral"
            :loading="isLoadingGeneration"
            :disabled="isLoadingGeneration"
            @click="generateAdventure(index)"
          >
            {{ hook.type }}
          </UButton>
        </div>
      </div>

      <Transition name="fade">
        <div
          v-if="
            backstory &&
            wrapper?.hook !== undefined &&
            ['closed', undefined].includes(wrapper?.streamStatus) &&
            hasRating
          "
          class="hide-from-exports"
        >
          <h3 class="content mt-6">
            {{ $t("generator.backstory.ratingQuestion") }}
          </h3>
          <div class="flex justify-between items-center max-w-[500px] gap-4">
            <MSStarRating
              v-model="initialRating"
              :size="2"
              @rate="
                (rating) =>
                  generator.setCurrentNPCRatingThrottle(rating, user.sessionId)
              "
            />
            <button
              @click="share?.toggle()"
              class="block whitespace-nowrap cursor-pointer transition-colors duration-200 py-1 px-4 border-2 border-solid border-text-neutral rounded-lg"
            >
              <Icon class="text-text-icon mr-2" name="solar:share-bold" />
              <span class="text-sm underline decoration-text-2">
                {{ $t("share.action") }}
              </span>
            </button>
          </div>
        </div>
      </Transition>

      <MSAlert
        v-if="tooManyRequests"
        type="danger"
        @close="tooManyRequests = false"
      >
        <p>{{ $t("error.tooManyRequests") }}</p>
      </MSAlert>
    </div>

    <MonsterShareModal ref="share" :generator-character="wrapper" />
  </div>
</template>

<script setup lang="ts">
import type { Character, GeneratorCharacter } from "@/types";

const p = defineProps({
  hasRating: {
    type: Boolean,
    default: true,
  },
});

const generator = useGeneratorStore();
const user = useUserStore();

const character = inject("character") as Ref<Character>;
const wrapper = inject("wrapper") as Ref<GeneratorCharacter>;

const share = ref<{ toggle: Function } | null>(null);
const hooks = character.value.character?.characterHooks;
const backstory = ref<string | undefined>(
  character.value?.character?.user?.backstory?.string as string,
);
const tooManyRequests = ref(false);
const isLoadingGeneration = ref(false);

const initialRating = ref<number>(0);

function getRating() {
  initialRating.value = generator.getCurrentNPCRating();
}

function saveBackstory(text: string) {
  if (!character.value.character.user) {
    character.value.character.user = {};
  }
  if (!character.value.character.user.backstory) {
    character.value.character.user.backstory = {
      string: "",
      type: "backstory",
    };
  }
  character.value.character.user.backstory.string = text;
  generator.saveSettingsThrottle();
}

async function generateAdventure(hook?: number) {
  isLoadingGeneration.value = true;
  await generator.generateBackstory(wrapper, hook);
  isLoadingGeneration.value = false;
}

watch(
  () => wrapper.value.streamStatus,
  () => {
    backstory.value =
      (character.value.character.user?.backstory?.string as string) ||
      undefined;
  },
);

onMounted(() => {
  getRating();
});
</script>
