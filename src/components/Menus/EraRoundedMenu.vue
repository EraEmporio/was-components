<template>
  <div class="menu-wrapper flex flex-col items-center gap-4">
    <era-rounded-icon-button
      v-for="(button, index) in buttons"
      v-bind:key="index"
      :config="button.config"
      :icon="button.icon"
      :styling="button.styling"
    />
  </div>
</template>
<script setup lang="ts">
import EraRoundedIconButton from "../Buttons/EraRoundedIconButton.vue";

type button = {
  config: object;
  icon: string;
  styling: {
    button: string;
    icon: string;
  };
};

defineProps({
  buttons: {
    type: Array<button>,
    default: () => [],
  },
});
</script>
