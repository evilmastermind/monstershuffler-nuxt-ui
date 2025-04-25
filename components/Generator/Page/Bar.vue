<template>
  <div class="bg-(--ui-bg-muted) border-b border-(--ui-bg-accented)">
    <MSContentWidth>
      <div class="top-bar items-center whitespace-nowrap h-12 gap-4">
        <!-- Info section -->
        <div class="top-bar-info flex justify-between items-center">
          <!-- Breadcrumbs / Back button -->
          <div v-if="isSheetOpen" class="truncate inline-block">
            <UButton
              class="mr-4 md:mr-6"
              variant="ghost"
              color="primary"
              icon="i-ms-arrow-left"
              :aria-label="$t('back')"
              @click="closeSheet"
            />
            <TBreadcrumb
              v-if="isSheetOpen && characters[currentCharacterIndex]"
            >
              {{
                characters[currentCharacterIndex].object.statistics?.fullName
              }}
            </TBreadcrumb>
          </div>
          <!-- Page title -->
          <TBreadcrumb v-else class="hidden md:block">
            {{ $t("generator.title") }}
          </TBreadcrumb>
          <!-- Mobile settings toggle -->
          <UButton
            v-if="settings.isFormMode && !isSheetOpen"
            class="block md:hidden"
            color="neutral"
            variant="ghost"
            :aria-label="$t('generator.options')"
            icon="i-ms-cog"
            @click="isFormOpen = !isFormOpen"
          />
          <!-- Prompt help -->
          <GeneratorPromptHelp
            v-else-if="!settings.isFormMode && !isSheetOpen"
            class="col-start-2"
          />
        </div>

        <!-- Generate button (mobile only) -->
        <div
          v-if="settings.isFormMode && !isSheetOpen"
          class="generate-button flex justify-start items-center gap-4 md:hidden"
        >
          <UButton
            color="primary"
            size="sm"
            :label="$t('generator.form.generate')"
            :loading="isButtonLoading"
            :disabled="isButtonLoading"
            @click="generateNpcsThrottle"
          />
        </div>

        <!-- Generator prompt (desktop) -->
        <GeneratorPrompt
          v-show="!settings.isFormMode && !isSheetOpen"
          class="prompt max-w-[400px] md:max-w-none"
        />

        <!-- Mode switch -->
        <div v-if="!isSheetOpen" class="top-bar-options flex justify-end gap-4">
          <USwitch
            v-model="settings.isFormMode"
            :label="settings.isFormMode ? 'Form' : 'Prompt'"
            :size="mdAndDown ? 'sm' : 'md'"
          />
        </div>
      </div>

      <!-- Generator form (mobile) -->
      <GeneratorForm
        v-if="isFormOpen"
        class="md:hidden mb-4"
        @close="isFormOpen = false"
      />
    </MSContentWidth>
  </div>
</template>

<script setup lang="ts">
const isFormOpen = ref(false);

const p = defineProps({
  isButtonLoading: {
    type: Boolean,
    default: false,
  },
  generateNpcsThrottle: {
    type: Function as PropType<() => void>,
    default: null,
  },
});

const { mdAndDown } = useScreen();
const generator = useGeneratorStore();
const editor = useMonsterEditorStore();

const { currentEditorMode } = storeToRefs(editor);
const { currentCharacterIndex, characters, settings } = storeToRefs(generator);

const isSheetOpen = computed(() => currentCharacterIndex.value > -1);

function closeSheet() {
  currentCharacterIndex.value = -1;
  currentEditorMode.value = "";
}
</script>
<style scoped>
.top-bar {
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-areas: "info input options";
  align-items: center;
}
.top-bar-info {
  grid-area: info;
}

.top-bar-options {
  grid-area: options;
}
.generate-button {
  grid-area: input;
}
.prompt {
  max-width: 400px;
}
@media (min-width: 48rem) {
  .top-bar {
    grid-template-columns: 1fr 50% 1fr;
    grid-template-areas: "info input options";
  }
  .prompt {
    max-width: none;
  }
}
</style>
