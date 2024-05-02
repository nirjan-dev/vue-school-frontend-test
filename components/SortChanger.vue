<template>
  <div class="text-center my-4 md:my-6">
    <label class="cursor-pointer">
      <input type="checkbox" @change="onSortChange" v-model="model" />
      Show newest to oldest
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  onSortChange: () => Promise<void>;
}>();

const model = defineModel<boolean>();
</script>
