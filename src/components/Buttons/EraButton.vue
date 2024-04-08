<template>
  <div class="card flex justify-center">
    <Button
      :label="label"
      :ptOptions="{ mergeProps: true }"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { usePrimeVue } from "primevue/config";

import Button from "primevue/button";
/* import ButtonPreset from "@/presets/was/button";

const primevue = usePrimeVue();
primevue.config.pt = ButtonPreset;
 */
defineOptions({
  inheritAttrs: false,
});

defineProps({
  label: {
    type: String,
    default: "Search",
  },
});
</script>
