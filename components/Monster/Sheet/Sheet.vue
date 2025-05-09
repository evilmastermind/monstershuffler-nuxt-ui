<template>
  <MSNote class="overflow-hidden">
    <component
      :is="layout"
      v-show="isLoaded"
      :key="key"
      :show-roleplay-stats
      @load="isLoaded = true"
    >
      <template #images="{ rules }">
        <MonsterImages :rules @load="isLoaded = true" />
      </template>
      <template #backstory>
        <MonsterBackstory v-show="isLoaded" />
      </template>
      <template #stats="{ columns: layoutColumns }">
        <StatBlock :columns="layoutColumns" />
      </template>
      <template #card>
        <MonsterSheetCard>
          <MonsterRoleplay />
        </MonsterSheetCard>
      </template>
    </component>
  </MSNote>
</template>

<script setup lang="ts">
import type { GeneratorCharacter, Character } from "@/types";

const e = defineEmits(["loaded"]);
const p = defineProps({
  generatorCharacter: {
    type: Object as PropType<GeneratorCharacter>,
    required: true,
  },
});

const generator = useGeneratorStore();
const { width } = useScreen();

const { settings } = storeToRefs(generator);
const generatorCharacter = toRef(p, "generatorCharacter");
const { columns, character } = useProvideCharacter(generatorCharacter);
const isLoaded = ref(false);
const key = ref(0);

const showRoleplayStats = computed(() => {
  return settings.value?.showRoleplayStats ?? true;
});

const layout = computed(() => {
  const layoutName = settings.value?.layout;
  switch (layoutName) {
    case "MonsterLayoutDynamicNoImage":
      return columns.value === 1
        ? resolveComponent("MonsterLayoutNoImageOneColumn")
        : resolveComponent("MonsterLayoutNoImageTwoColumn");
    case "MonsterLayoutDynamicA":
      return columns.value === 1
        ? resolveComponent("MonsterLayoutOneColumnA")
        : resolveComponent("MonsterLayoutTwoColumnA");
    case "MonsterLayoutOneColumnA":
      return resolveComponent("MonsterLayoutOneColumnA");
    case "MonsterLayoutOneColumnB":
      return resolveComponent("MonsterLayoutOneColumnB");
    case "MonsterLayoutOneColumnC":
      return width.value >= 800
        ? resolveComponent("MonsterLayoutOneColumnC")
        : resolveComponent("MonsterLayoutOneColumnA");
    case "MonsterLayoutOneColumnD":
      return width.value >= 800
        ? resolveComponent("MonsterLayoutOneColumnD")
        : resolveComponent("MonsterLayoutOneColumnA");
    case "MonsterLayoutTwoColumnA":
      return resolveComponent("MonsterLayoutTwoColumnA");
    case "MonsterLayoutTwoColumnB":
      return resolveComponent("MonsterLayoutTwoColumnB");
    case "MonsterLayoutTwoColumnC":
      return width.value >= 800
        ? resolveComponent("MonsterLayoutTwoColumnC")
        : resolveComponent("MonsterLayoutTwoColumnA");
  }
  return columns.value === 1
    ? resolveComponent("MonsterLayoutOneColumnA")
    : resolveComponent("MonsterLayoutTwoColumnA");
});

// function getLayout(
//   character: Character,
//   defaultLayout = settings.value?.layout || "MonsterLayoutDynamicA",
//   showRoleplayStats = settings.value?.showRoleplayStats ?? true
// ) {
//   const c = character.character;
//   if (!c?.user) {
//     c.user = {};
//   }
//   if (!c?.user?.sheet) {
//     c.user.sheet = {
//       layout: defaultLayout,
//       showRoleplayStats,
//       images: [],
//     };
//     return defaultLayout;
//   }
//   return c.user.sheet.layout || defaultLayout;
// }

watch(isLoaded, () => {
  key.value += 1;
});

onMounted(() => {
  e("loaded");
});
</script>

<style scoped></style>
