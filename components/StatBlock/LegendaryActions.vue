<template>
  <StatBlockActionType
    v-if="statistics?.legendaryActions?.length"
    type="legendaryActions"
  />
  <MonsterDescription
    v-if="statistics?.legendaryActions?.length"
    :parts="statistics?.legendaryActionsIntro?.array || []"
    period
  />
  <MonsterDescription
    v-for="(action, index) in statistics?.legendaryActions"
    :key="index"
    class="my-2 leading-6"
    :parts="action.array"
    :name="action.nameArray"
    period
  />
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";
const statistics = inject("statistics") as ComputedRef<Statistics>;
</script>

<style scoped></style>
