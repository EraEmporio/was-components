<template>
  <div class="card flex justify-center">
    <Button
      :label="label"
      :loading="loading"
      :ptOptions="{ mergeProps: true }"
      @click="load"
      v-bind="$attrs"
      />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePrimeVue } from "primevue/config";

import Button from "primevue/button";
import ButtonPreset from "@/presets/was/button";

const loading = ref(false);

const primevue = usePrimeVue();
primevue.config.pt = ButtonPreset;

defineOptions({
  inheritAttrs: false,
});

defineProps({
  label: {
    type: String,
    default: "Search",
  },
});

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
