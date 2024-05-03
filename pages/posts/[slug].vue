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
    select: "id,title,content,publishedAt,image,content",
  },
});

if (!post || !post.value || error.value || typeof post.value !== "object") {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

useHead({
  title: post.value.title,
  meta: [
    {
      name: "description",
      content: post.value.excerpt,
    },
  ],
});
</script>
