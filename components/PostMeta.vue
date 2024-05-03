<template>
  <div class="flex gap-6 items-center mb-4">
    <div class="flex gap-2 items-center">
      <NuxtPicture
        width="30"
        height="30"
        :alt="user?.firstName + ' ' + user?.lastName"
        :img-attrs="{ class: 'rounded-full' }"
        loading="lazy"
        v-if="user?.avatar"
        :src="user?.avatar"
      ></NuxtPicture>
      <p class="text-sm">{{ user?.firstName }} {{ user?.lastName }}</p>
    </div>
    <time class="opacity-70 text-sm">{{ formatDate(publishedAt) }}</time>
  </div>
</template>

<script setup lang="ts">
import type { User } from "~/types";

defineProps<{
  user: User | undefined;
  publishedAt: number | undefined | null;
}>();

function formatDate(dateString: null | number | undefined) {
  if (!dateString) return "";

  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    day: "numeric",
    month: "short",
  };

  return date.toLocaleDateString("en-US", options);
}
</script>
