<template>
  <div>
    <h1
      class="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-8 md:mb-6 text-center"
    >
      Blog Posts
    </h1>
    <SortChanger v-model="newestFirst" :onSortChange="onSortChange" />
    <main>
      <PostList
        v-if="!error && posts && posts.length"
        :posts="posts"
        :is-loading="pending"
        :posts-count="PAGE_SIZE"
      />

      <p v-else class="text-center p-3 bg-red-200 text-red-900">
        Something went wrong loading the posts. Please try again later.
      </p>

      <PaginationSection
        :currentFirstPostNumber="currentFirstPostNumber"
        :currentLastPostNumber="currentLastPostNumber"
        :totalPosts="totalPosts"
        :page="page"
        :page-size="PAGE_SIZE"
        @on-page-change="onPageChange"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const PAGE_SIZE = 12;
const newestFirst = ref(route.query.order !== "oldestFirst");

const page = computed(() => {
  return typeof route.query.page === "string" ? parseInt(route.query.page) : 1;
});

const offset = computed(() => {
  return (page.value - 1) * PAGE_SIZE;
});

const currentFirstPostNumber = computed(() => {
  return offset.value + 1;
});

const currentLastPostNumber = computed(() => {
  return offset.value + PAGE_SIZE;
});

const { data: totalPosts } = await useFetch("/api/posts/count");
const {
  data: posts,
  refresh,
  pending,
  error,
} = await useAsyncData("posts", () => {
  return $fetch("/api/posts", {
    query: {
      limit: PAGE_SIZE,
      offset: offset.value,
      include: "user",
      order: route.query.order ?? "newestFirst",
      select:
        "id,title,content,excerpt,publishedAt,image,content,user.firstName, user.lastName, user.avatar, user.email",
    },
  });
});

async function onPageChange(currentPage: number) {
  const query = {
    ...route.query,
    page: currentPage,
  };

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  await router.push({ query });

  await refresh();
}

async function onSortChange() {
  await router.push({
    query: {
      ...route.query,
      order: newestFirst.value ? "newestFirst" : "oldestFirst",
    },
  });

  await refresh();
}

useHead({
  title: "Blog Posts | SEO Optimized Title here",
  meta: [
    {
      name: "description",
      content: "SEO Optimized Description here",
    },
  ],
});
</script>
