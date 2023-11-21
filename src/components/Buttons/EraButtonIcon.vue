<template>
  <button
    type="button"
    :class="twMerge('text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:outline-none ring-inset font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800', styles.btn)"
  >
  <div class="btnIcon-wrapper flex justify-between items-center w-full">
      <span :class="twMerge('grow text-left', styles.label)">{{ label }}</span>
      <Icon
        :class="twMerge('h-3.5 w-3.5', styles.icon)"
        :icon="icon"
        color="rgb(209 213 219 / var(--tw-border-opacity))"
      />
  </div>
  </button>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";

type BtnStyles = {
  icon: string;
  btn: string;
  label: string;
};

defineProps({
  label: {
    type: String,
    default: "Label",
  },
  icon: {
    type: String,
    default: 'mi:close'
  },
  styles: {
    type: Object as PropType<BtnStyles>,
    default: () => {
      return {
        label: "",
        icon: "",
      };
    },
  },
});
</script>
