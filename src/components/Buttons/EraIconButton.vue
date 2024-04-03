<template>
  <div class="card flex justify-center">
    <Button
      :loading="loading"
      :class="twMerge('w-[40px] h-[40px]', styling)"
      :ptOptions="{ mergeProps: true }"
      @click="load"
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
import { ref } from "vue";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

import Button from "primevue/button";
import ButtonPreset from "@/presets/was/button";

const loading = ref(false);

/* type iconType = {
    name: string
    styling: string
} */

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

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
