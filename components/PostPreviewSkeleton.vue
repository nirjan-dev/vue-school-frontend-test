<template>
  <div
    v-for="i in postsCount"
    class="mb-8 border-b-4 grid gap-3 pb-4 rounded-b-md bg-gray-200 h-96 animate-pulse"
  ></div>
</template>

<script setup lang="ts">
defineProps<{
  postsCount: number;
}>();
</script>
