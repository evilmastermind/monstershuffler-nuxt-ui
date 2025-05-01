<template>
  <UDropdownMenu v-model:open="open" :items>
    <UTooltip :text="$t('navbar.menuTitle')">
      <UButton
        variant="soft"
        color="neutral"
        icon="i-xxx-burger"
        size="lg"
        :aria-label="$t('navbar.menuTitle')"
      />
    </UTooltip>
  </UDropdownMenu>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

const open = ref(false);

const items = [
  [
    {
      label: t("navbar.menu.home"),
      icon: "i-xxx-home",
      to: localePath({ name: "index" }),
    },
    {
      label: t("navbar.menu.npcGenerator"),
      icon: "i-xxx-random",
      to: localePath({ name: "monsters-generator" }),
    },
    {
      label: t("navbar.menu.editors"),
      icon: "i-xxx-editor",
      to: localePath({ name: "monsters-editors" }),
    },
  ],
  [
    {
      icon: "i-xxx-reddit",
      label: "Reddit",
      to: "https://reddit.com/r/monstershuffler",
      target: "_blank",
    },
    {
      icon: "i-xxx-github",
      label: "GitHub",
      to: "https://github.com/evilmastermind/monstershuffler",
      target: "_blank",
    },
  ],
];
</script>

<style scoped></style>
