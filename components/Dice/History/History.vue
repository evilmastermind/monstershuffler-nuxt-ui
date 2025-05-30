<template>
  <div class="flex flex-col justify-end items-end gap-1">
    <Transition name="fade-quick">
      <div
        v-if="!isHistoryOpen"
        class="flex flex-col justify-end items-end gap-1"
      >
        <TransitionGroup name="list">
          <DiceHistoryPreview
            v-for="roll in diceRollsWithId"
            :key="`${roll.id}`"
            :roll="roll"
          />
        </TransitionGroup>
      </div>
    </Transition>

    <Transition name="fade-quick" mode="out-in">
      <DiceHistoryCard v-if="isHistoryOpen" @close="isHistoryOpen = false" />
      <button
        v-else
        class="mt-1 cursor-pointer grid place-items-center text-xl w-8 h-8 rounded-full overflow-hidden bg-accented border border-solid border-accented text-al-evil shadow-lg"
        :title="$t('dice.open')"
        @click="isHistoryOpen = true"
      >
        <DiceD20 :size="2" :stroke="3" />
        <span class="sr-only">{{ $t("dice.open") }}</span>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { DiceRoll } from "@/types";

const maxSize = 3;
const timeout = 5000;

type IdTimeout = {
  id: string;
  timeout: ReturnType<typeof setTimeout>;
};

const rolls = useRollsStore();

const diceRollsWithId = ref<(DiceRoll & IdTimeout)[]>([]);
const isHistoryOpen = ref(false);
const { diceRolls } = storeToRefs(rolls);
const areRollsLoaded = ref(false);

watch(
  diceRolls,
  () => {
    if (!diceRolls.value.length) {
      return;
    }
    if (diceRollsWithId.value.length >= maxSize) {
      diceRollsWithId.value.shift();
    }
    const newId = Math.random().toString(36).substring(7);
    diceRollsWithId.value.push({
      ...diceRolls.value[diceRolls.value.length - 1],
      id: newId,
      timeout: setTimeout(() => {
        removeRoll(newId);
      }, timeout),
    });
  },
  { deep: true },
);

function removeRoll(id: string) {
  if (!diceRollsWithId.value.length) {
    return;
  }
  const index = diceRollsWithId.value.findIndex((roll) => roll.id === id);
  if (index === -1) {
    return;
  }
  clearTimeout(diceRollsWithId.value[index].timeout);
  diceRollsWithId.value.splice(index, 1);
}

onMounted(() => {
  rolls.loadFromLocalStorage();
});
</script>
