<template>
  <div
    class="grid gap-2 md:gap-6 lg:grid-cols-3 md:grid-cols-2 max-w-5xl mx-auto"
  >
    <template v-if="!isLoading">
      <article
        class="mb-8 border-b-4 grid gap-3 pb-4 rounded-b-md bg-white"
        v-for="(post, index) in posts"
        :key="post.id"
      >
        <NuxtImg
          v-if="post.image"
          :src="post.image"
          sizes="100vw md:50vw lg:33vw"
          width="1920"
          height="1080"
          class="rounded-lg"
          :placeholder="index < 3 ? false : [50, 25, 75, 5]"
          :loading="index < 3 ? 'eager' : 'lazy'"
          :preload="index === 0 ? true : false"
        />
        <div class="px-4 py-2 grid gap-2">
          <h2 class="text-2xl font-bold">{{ post.title }}</h2>
          <p class="opacity-80">{{ post.excerpt }}</p>
          <div class="flex gap-6 items-center mb-4">
            <div class="flex gap-2 items-center">
              <NuxtImg
                width="30"
                height="30"
                class="rounded-full"
                v-if="post.user?.avatar"
                :src="post.user?.avatar"
              ></NuxtImg>
              <p class="text-sm">
                {{ post.user?.firstName }} {{ post.user?.lastName }}
              </p>
            </div>
            <time class="opacity-70">{{ formatDate(post.publishedAt) }}</time>
          </div>
          <NuxtLink
            class="text-center hover:bg-green-700 transition-colors active:border-b-2 p-3 bg-green-600 border-b-4 rounded-md border-b-green-700 text-white"
            :to="`/posts/${post.id}`"
            :title="`continue reading about ${post.title}`"
            >Continue reading</NuxtLink
          >
        </div>
      </article>
    </template>

    <template v-else>
      <div
        v-for="i in postsCount"
        class="mb-8 border-b-4 grid gap-3 pb-4 rounded-b-md bg-gray-200 h-96 animate-pulse"
      ></div>
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
