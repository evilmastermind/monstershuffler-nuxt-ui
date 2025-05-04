<template>
  <p class="my-0 leading-[1.5em]">
    <em class="title" :class="moral">
      <slot name="bold non-italic" />
    </em>
    <span>&nbsp;</span>
    <slot />
  </p>
</template>

<script setup lang="ts">
const moral = inject("moral") as string;
</script>

<style scoped></style>
