<template>
  <div>
    <h1
      class="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 lg:mb-8 md:mb-6 text-center"
    >
      Blog Posts
    </h1>
    <div class="text-center my-4 md:my-6">
      <label class="cursor-pointer">
        <input type="checkbox" @change="onSortChange" v-model="newestFirst" />
        Show newest to oldest
      </label>
    </div>
    <main>
      <PostList
        v-if="!error && posts && posts.length"
        :posts="posts"
        :is-loading="pending"
        :posts-count="pageSize"
      />

      <p v-else class="text-center p-3 bg-red-200 text-red-900">
        Something went wrong loading the posts. Please try again later.
      </p>

      <div class="flex flex-col items-center">
        <!-- Help text -->
        <span class="text-sm">
          Showing
          <span class="font-semibold">{{ currentFirstPostNumber }}</span> to
          <span class="font-semibold">{{ currentLastPostNumber }}</span> of
          <span class="font-semibold">{{ totalPosts }}</span>
          Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <!-- Buttons -->
          <button
            @click="prev"
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900"
          >
            <svg
              class="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <button
            @click="next"
            class="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
          >
            Next
            <svg
              class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();

const newestFirst = ref(route.query.order === "newestFirst");

const { data: totalPosts } = await useFetch("/api/posts/count");

const page =
  typeof route.query.page === "string" ? parseInt(route.query.page) : 1;
const pageSize = 12;

const { currentPage, currentPageSize, prev, next } = useOffsetPagination({
  total: totalPosts.value ?? 0,
  page,
  pageSize,
  onPageChange: onPageChange,
  onPageSizeChange: onPageChange,
});

const currentFirstPostNumber = computed(() => {
  return offset.value + 1;
});

const currentLastPostNumber = computed(() => {
  return offset.value + currentPageSize.value;
});

async function onPageChange() {
  const query = {
    ...route.query,
    page: currentPage.value,
  };

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  await router.push({ query });

  await refresh();
}

const offset = computed(() => {
  return (currentPage.value - 1) * currentPageSize.value;
});

const {
  data: posts,
  refresh,
  pending,
  error,
} = await useAsyncData("posts", () => {
  return $fetch("/api/posts", {
    query: {
      limit: 12,
      offset: offset.value,
      include: "user",
      order: route.query.order ?? "newestFirst",
      select:
        "id,title,content,excerpt,publishedAt,image,content,user.firstName, user.lastName, user.avatar, user.email",
    },
  });
});

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
