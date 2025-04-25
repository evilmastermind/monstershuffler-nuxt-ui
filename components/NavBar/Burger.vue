<template>
  <UDropdownMenu v-model:open="open" :items>
    <UButton variant="soft" color="dark" icon="i-ms-burger" size="lg" />
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
      icon: "i-ms-home",
      to: localePath({ name: "index" }),
    },
    {
      label: t("navbar.menu.npcGenerator"),
      icon: "i-ms-random",
      to: localePath({ name: "monsters-generator" }),
    },
    {
      label: t("navbar.menu.editors"),
      icon: "i-ms-editor",
      to: localePath({ name: "monsters-editors" }),
    },
  ],
  [
    {
      icon: "i-ms-reddit",
      label: "Reddit",
      to: "https://reddit.com/r/monstershuffler",
      target: "_blank",
    },
    {
      icon: "i-ms-github",
      label: "GitHub",
      to: "https://github.com/evilmastermind/monstershuffler",
      target: "_blank",
    },
  ],
];
</script>

<style scoped></style>
