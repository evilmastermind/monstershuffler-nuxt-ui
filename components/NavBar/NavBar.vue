<template>
  <div
    class="w-full fixed h-[60px] flex items-center border-b border-(--ui-bg-accented) bg-gradient-to-b from-(--ui-bg-muted) to-(--ui-bg-accented)/80 backdrop-blur-xs z-20"
  >
    <MSContentWidth>
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <NavBarLogo />
          <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.home')"
            route="index"
          />
          <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.npcGenerator')"
            route="monsters-generator"
          />
          <NavBarLink
            class="hidden md:block"
            :name="$t('navbar.menu.editors')"
            route="monsters-editors"
          />
        </div>
        <div class="flex items-center gap-4">
          <NavBarSocialLinks class="hidden md:inline-flex" />
          <NavBarSettings />
          <NavBarBurger class="inline-flex md:hidden" />
        </div>
      </div>
    </MSContentWidth>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
