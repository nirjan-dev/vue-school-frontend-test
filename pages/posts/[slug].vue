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
            <time class="opacity-70 text-sm">{{
              formatDate(post.publishedAt)
            }}</time>
          </div>
        </div>
      </div>

      <div class="prose max-w-none mb-6" v-html="post.content"></div>

      <div class="text-center my-4">
        <NuxtLink
          class="text-center hover:bg-green-700 transition-colors active:border-b-2 p-3 bg-green-600 border-b-4 rounded-md border-b-green-700 text-white"
          to="/posts"
          >View All Posts</NuxtLink
        >
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
