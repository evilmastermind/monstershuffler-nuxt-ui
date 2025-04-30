<template>
  <UPopover v-model:open="open" :items>
    <UTooltip :text="$t('navbar.menu.settings')">
      <UButton
        variant="ghost"
        color="neutral"
        icon="i-xxx-cog"
        size="lg"
        :aria-label="$t('navbar.menu.settings')"
      />
    </UTooltip>
    <template #content>
      <div class="flex flex-col gap-3 p-4">
        <UFormField :label="$t('navbar.settings.statBlockStyle')" size="xs">
          <NavBarStatBlockTheme />
        </UFormField>
        <UFormField :label="$t('navbar.settings.uiTheme')" size="xs">
          <NavBarUITheme />
        </UFormField>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const open = ref(false);

const items = [
  {
    slot: "ui",
  },
];
</script>

<style scoped></style>
