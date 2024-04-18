<template>
  <div class="card flex justify-center">
    <Button
      :class="twMerge('w-[40px] h-[40px]', styling)"
      :ptOptions="{ mergeProps: true }"
      v-bind="$attrs"
    >
      <template #icon>
        <slot>
          <Icon
            :icon="icon.name"
            :class="twMerge('w-5 h-auto text-white', icon.styling)"
          />
        </slot>
      </template>
    </Button>
  </div>
</template>

<script setup>
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

import Button from "primevue/button";
import ButtonPreset from "@/presets/was/button";

defineOptions({
  inheritAttrs: false,
});

defineProps({
  styling: {
    type: String,
    default: "",
  },
  icon: {
    type: Object,
    default: () => {
      return {
        name: "mi:add",
        styling: "",
      };
    },
  },
});


</script>
