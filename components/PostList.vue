<template>
  <div
    class="grid gap-2 md:gap-6 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto"
  >
    <template v-if="!isLoading">
      <PostPreviewCard :posts="posts" />
    </template>

    <template v-else>
      <PostPreviewSkeleton :postsCount="postsCount" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { PostWithUser } from "~/types";

defineProps<{
  posts: Partial<PostWithUser>[];
  isLoading: boolean;
  postsCount: number;
}>();
</script>
