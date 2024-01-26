<template>
  <div class="card flex justify-center">
    <Dropdown
      v-model="selectedCity"
      @click="isDropdownOpen = !isDropdownOpen"
      optionLabel="name"
      placeholder="Select a City"
      :ptOptions="{ mergeProps: true }"
      :options="cities"
      class="w-full md:w-[14rem]"
      :pink = "$attrs.pink"
      v-bind="$attrs"
    >
      <template #value="{ placeholder }">
        {{ placeholder }} Batatinha
      </template>
      <template #dropdownicon>
        <Icon
          :icon="
            isDropdownOpen
              ? 'majesticons:chevron-up'
              : 'majesticons:chevron-down'
          "
          class="w-5 h-5 md:block hidden text-selenium-800"
        />
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Dropdown from "primevue/dropdown";
import DropdownPreset from "../../presets/was/dropdown";
import { usePrimeVue } from "primevue/config";

const isDropdownOpen = ref(false);

const primevue = usePrimeVue();
primevue.config.pt = DropdownPreset;

defineOptions({
  inheritAttrs: false,
});



defineProps({ pink: { type: Boolean, default: false } });
const selectedCity = ref();
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
</script>
