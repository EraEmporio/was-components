<template>
  <form @submit.prevent="submitSearch">
    <label
      for="default-search"
      :class="
        twMerge(
          'mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white',
          searchInputStyle.label
        )
      "
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        :class="
          twMerge(
            'block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            searchInputStyle.input
          )
        "
        :placeholder="placeholder"
        @input="emitInputByTyping"
        v-model="input"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { twMerge } from "tailwind-merge";

type SearchStyle = {
  label: string;
  input: string;
};

const emits = defineEmits(["searchInput"]);
const input = ref("");

defineProps({
  placeholder: {
    type: String,
    default: "Localizar",
  },
  searchInputStyle: {
    type: Object as PropType<SearchStyle>,
    default: () => {
      return { label: "", input: "" };
    },
  },
});

const emitInputByTyping = () => {
  emits("searchInput", input);
};
const submitSearch = () => {
  emits("searchInput", input);
};
</script>
<style>
#default-search::-webkit-search-cancel-button {
  cursor: pointer;
}
</style>
