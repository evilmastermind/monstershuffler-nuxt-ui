<template>
  <div class="layout">
    <NavBar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const user = useUserStore();
user.getGeneralSettings();
</script>

<style scoped></style>
