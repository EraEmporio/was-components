<template>
  <div class="flex items-center h-full">
    <input
      id="default-checkbox"
      type="checkbox"
      value=""
      :class="
        twMerge(
          'w-4 h-4 rounded border-gray-400 text-cyan-700 focus:ring-0 focus:ring-transparent dark:bg-gray-700 dark:border-gray-600',
          addStyle.input
        )
      "
    />
    <label
      for="default-checkbox"
      :class="
        twMerge(
          'ms-2 text-sm font-medium text-gray-900 dark:text-gray-300',
          addStyle.label
        )
      "
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { twMerge } from "tailwind-merge";

type CheckStyle = {
  input: string;
  label: string;
};

defineProps({
  label: {
    type: String,
    default: "",
  },
  addStyle: {
    type: Object as PropType<CheckStyle>,
    default: () => {
      return {
        input: "",
        label: "",
      };
    },
  },
});
</script>
