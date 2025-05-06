<template>
  <div class="background bg-default">
    <slot />
  </div>
</template>

<script setup lang="ts">
const ui = useUiStore();

const background = computed(() => {
  switch (ui.currentThemeType) {
    case "light":
      return "background-light";
    case "dark":
      return "background-dark";
  }
});
</script>

<style scoped>
.background {
  position: relative;
  overflow: hidden;
}
.background-light {
  background-image: url("@/public/images/monster/paper.webp");
}
.background-dark {
  background-image: url("@/public/images/monster/paper-dark.webp");
}
</style>
