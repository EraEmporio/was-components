<template>
  <button
    v-bind="config"
    @click="config.clickEvent"
    :title="title"
    type="button"
    :class="twMerge('rounded-icon-btn p-3 rounded-full text-white bg-black/30 hover:bg-black/50', styling.button)"
  >
    <Icon :icon="icon" :class="twMerge('w-5 h-auto', styling.icon)" />
  </button>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

type RoundedIcoStyle = {
  button: string;
  icon: string;
}

defineProps({
  title: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => {}
  },
  icon: {
    type: String,
    default: 'heroicons:heart-20-solid'
  },
  styling: {
    type: Object as PropType<RoundedIcoStyle>,
    default: () => {
      return {
        button: '',
        icon: ''
      }
    }
  }
})
</script>