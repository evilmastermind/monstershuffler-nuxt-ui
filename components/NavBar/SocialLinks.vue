<template>
  <div class="flex items-center">
    <UTooltip text="Reddit">
      <UButton
        to="https://reddit.com/r/monstershuffler"
        variant="ghost"
        color="neutral"
        size="lg"
        icon="i-ms-reddit"
        target="_blank"
        square
        rel="noopener noreferrer"
      />
    </UTooltip>
    <UTooltip text="GitHub">
      <UButton
        to="https://github.com/evilmastermind/monstershuffler"
        variant="ghost"
        color="neutral"
        size="lg"
        icon="i-ms-github"
        target="_blank"
        square
        rel="noopener noreferrer"
      />
    </UTooltip>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
