<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div
    class="px-3 py-6 bg-green-50 h-screen flex justify-center items-center text-center"
  >
    <div class="flex flex-col gap-4">
      <h1 class="text-6xl">{{ error?.statusCode }}</h1>
      <p class="text-3xl">{{ error?.message }}</p>
      <div>
        <button class="primary-link" @click="handleError">Back to Home</button>
      </div>
    </div>
  </div>
</template>
