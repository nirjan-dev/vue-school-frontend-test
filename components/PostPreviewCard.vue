<template>
  <article
    class="mb-8 border-b-4 grid gap-3 pb-4 rounded-b-md bg-white"
    v-for="(post, index) in posts"
    :key="post.id"
  >
    <NuxtPicture
      v-if="post.image"
      :src="post.image"
      sizes="100vw md:50vw lg:33vw"
      width="1920"
      height="1080"
      class="rounded-lg"
      :alt="post.title ?? undefined"
      :placeholder="index < 3 ? false : [50, 25, 75, 5]"
      :loading="index < 3 ? 'eager' : 'lazy'"
      :preload="index === 0 ? true : false"
    />
    <div class="px-4 py-2 grid gap-2">
      <h2 class="text-2xl font-bold">{{ post.title }}</h2>
      <p class="opacity-80">{{ post.excerpt }}</p>
      <PostMeta :user="post.user" :publishedAt="post.publishedAt" />
      <NuxtLink
        class="primary-link"
        :to="`/posts/${post.id}`"
        :title="`continue reading about ${post.title}`"
        >Continue reading</NuxtLink
      >
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PostWithUser } from "~/types";

defineProps<{
  posts: Partial<PostWithUser>[];
}>();
</script>
