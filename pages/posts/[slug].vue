<template>
  <div class="h-full max-w-prose mx-auto">
    <main v-if="post && typeof post !== 'number'">
      <PostContent :post="post" />

      <div class="text-center my-4">
        <NuxtLink class="primary-link" to="/posts">View All Posts</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug;

const { data: post, error } = await useFetch(`/api/posts/${slug}`, {
  query: {
    include: "user",
    select: "id,title,content,publishedAt,image,content,excerpt",
  },
});

if (!post || !post.value || error.value || typeof post.value !== "object") {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useSeoMeta({
  description: post.value.excerpt,
  twitterTitle: post.value.title,
  twitterDescription: post.value.excerpt,
  twitterImage: post.value.image,
  twitterCard: "summary",
  ogImage: post.value.image,
  title: post.value.title,
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
