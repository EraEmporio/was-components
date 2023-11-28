<template>
  <div
    id="alert-1"
    :class="
      twMerge(
        'w-screen flex items-center px-6 py-4 text-blue-800 bg-blue-50',
        styling.alert
      )
    "
    role="alert"
  >
    <Icon v-if="icon.show" :icon="icon.icon" />
    <span class="sr-only">Info</span>
    <div :class="twMerge('w-full ms-3 text-sm font-medium', styling.label)">
      {{ label }}
    </div>
    <button
      type="button"
      :class="
        twMerge(
          'ms-auto -mx-1.5 -my-1.5 bg-blue-50 rounded-full hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 text-blue-500',
          styling.button
        )
      "
      data-dismiss-target="#alert-1"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <Icon icon="tabler:x" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { PropType, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { twMerge } from "tailwind-merge";

type Styling = {
  alert: string;
  label: string;
  button: string;
};

type Icon = {
    show: boolean;
    icon: string
}

defineProps({
  styling: {
    type: Object as PropType<Styling>,
    default: () => {
      return {
        alert: "",
        label: "",
        button: "",
      };
    },
  },
  icon: {
    type: Object as PropType<Icon>,
    default: () => {
        return{
            show: true,
            icon: "ph:info-fill"
        }
    },
  },
  label: {
    type: String,
    default: "",
  },
});

onMounted(() => {
  initFlowbite();
});
</script>
