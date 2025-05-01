<template>
  <button
    class="flec cursor-pointer bg-gray-400 hover:outline-2 hover:outline-primary h-[84px] sm:h-[126px]"
    :class="selected ? 'outline-2 outline-primary' : ''"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const p = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
