<template>
  <fieldset :class="twMerge('border-t border-silver-300', styling.fieldset)">
    <legend
      :class="twMerge('mx-auto px-2 text-xs text-silver-300', styling.legend)"
    >
      {{ label }}
    </legend>
  </fieldset>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { PropType } from "vue";

type DividerStyle = {
  fieldset: string;
  legend: string;
};

defineProps({
  styling: {
    type: Object as PropType<DividerStyle>,
    default: () => {
      return {
        fieldset: "",
        legend: "",
      };
    },
  },
  label: {
    type: String,
    default: "",
  },
});
</script>
