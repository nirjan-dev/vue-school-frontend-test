<template>
  <div class="h-full max-w-prose mx-auto">
    <main v-if="post && typeof post !== 'number'">
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
    select:
      "id,title,content,excerpt,publishedAt,image,content,user.firstName, user.lastName, user.avatar",
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
