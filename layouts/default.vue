<template>
  <div>
    <div class="min-h-svh">
      <NavBar />
      <main>
        <slot />
      </main>
    </div>
    <MSFooter />
  </div>
</template>

<script setup lang="ts">
const user = useUserStore();
user.getGeneralSettings();
</script>

<style scoped></style>
