<template>
  <div
    class="autarchy-container flex flex-1 flex-row gap-2 items-center justify-start pt-2 px-4 pb-4 overflow-x-auto"
  >
    <button
      v-for="(autarchyCard, index) in autarchyCards"
      v-bind:key="index"
      :class="
        twMerge(
          'autarchy-card shrink-0 w-40 h-[105px] pt-2 gap-2 flex flex-col items-center justify-between overflow-hidden rounded-xl border border-selenium-400 hover:opacity-80',
          autarchyCardStyle.card
        )
      "
    >
      <img :src="autarchyCard.image" :class="twMerge('w-12 h-auto', autarchyCard.imageConfig)" />
      <div
        :class="
          twMerge(
            'px-4 py-2 w-full bg-selenium-400 rounded-b-xl text-white text-xs',
            autarchyCardStyle.label
          )
        "
      >
        {{ autarchyCard.label }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { AutarchyCard, AutarchyCardStyle } from "./constants";
import { PropType } from "vue";
import { twMerge } from "tailwind-merge";

defineProps({
  autarchyCards: {
    type: Array<AutarchyCard>,
    default: () => [],
  },
  autarchyCardStyle: {
    type: Object as PropType<AutarchyCardStyle>,
    default: () => {
      return {
        card: "",
        label: "",
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.autarchy-container::-webkit-scrollbar {
  height: 8px;
  background-color: inherit;
}
.autarchy-container::-webkit-scrollbar-thumb {
  background-color: #e6e7e8;
}
.autarchy-container::-webkit-scrollbar-thumb:hover {
  background-color: #b7bdc9;
  transition: background-color 1s ease-in-out 1s;
}
</style>
