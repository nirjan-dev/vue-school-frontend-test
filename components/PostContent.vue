<template>
  <div>
    <h1 class="text-5xl lg:text-6xl lg:mb-10 font-bold mb-6">
      {{ post.title }}
    </h1>

    <div class="flex justify-center flex-col gap-4">
      <NuxtImg
        v-if="post.image"
        :src="post.image"
        sizes="100vw md:50vw lg:33vw"
        width="1920"
        height="1080"
        class="rounded-lg"
        :preload="true"
      />

      <div>
        <PostMeta :user="post.user" :publishedAt="post.publishedAt" />
      </div>
    </div>

    <div class="prose max-w-none mb-6" v-html="post.content"></div>
  </div>
</template>

<script setup lang="ts">
import type { PostWithUser } from "~/types";

defineProps<{
  post: PostWithUser;
}>();
</script>
