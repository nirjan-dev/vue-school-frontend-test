<template>
  <div class="flex flex-col items-center">
    <span class="text-sm">
      Showing
      <span class="font-semibold">{{ currentFirstPostNumber }}</span> to
      <span class="font-semibold">{{ currentLastPostNumber }}</span> of
      <span class="font-semibold">{{ totalPosts }}</span>
      Entries
    </span>
    <div class="inline-flex mt-2 xs:mt-0">
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
</template>

<script setup lang="ts">
const props = defineProps<{
  currentFirstPostNumber: number;
  currentLastPostNumber: number;
  page: number;
  totalPosts: number | null;
  pageSize: number;
}>();

const emit = defineEmits<{
  onPageChange: [currentPage: number];
}>();

const { currentPage, prev, next } = useOffsetPagination({
  total: props.totalPosts ?? 0,
  page: props.page,
  pageSize: props.pageSize,
  onPageChange,
});

function onPageChange() {
  emit("onPageChange", currentPage.value);
}
</script>
