<template>
  <div class="card flex justify-center">
    <Button
      label="Search"
      icon="pi pi-search"
      :loading="loading"
      :ptOptions="{ mergeProps: true }"
      @click="load"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import ButtonPreset from "@/presets/was/button";
import { usePrimeVue } from "primevue/config";

const loading = ref(false);

const primevue = usePrimeVue();
primevue.config.pt = ButtonPreset;

defineOptions({
  inheritAttrs: false,
});

const load = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
