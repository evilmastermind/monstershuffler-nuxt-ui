<template>
  <UContainer>
    <ContentRenderer v-for="post in posts" :value="post" />
  </UContainer>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData(`content`, () => {
  return queryCollection("news").order("date", "DESC").all();
});

onMounted(async () => {
  console.log(await queryCollection("news").first());
});
</script>

<style scoped></style>
