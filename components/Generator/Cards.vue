<template>
  <div>
    <!-- <h3 class="content text-text-evil">
      {{ $t("generator.pickOne") }}
    </h3> -->
    <div class="flex flex-col-reverse gap-6 w-full mt-2">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <template v-for="(npc, index) in session" :key="`${index}${npc.id}`">
          <Transition name="fade-scroll-slow" appear>
            <MonsterCard
              :generator-character="{
                key: 1,
                id: npc.id,
                streamChunks: [],
                object: npc.object as Character,
              }"
              :style="{
                transitionDelay: `${0.15 * index}s`,
                transitionProperty: 'opacity, transform',
              }"
              :index
              selectable
              tabindex="0"
            />
          </Transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Character } from "@/types";

const generator = useGeneratorStore();

const { session } = storeToRefs(generator);
</script>

<style scoped></style>
