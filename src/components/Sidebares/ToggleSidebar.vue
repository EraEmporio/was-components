<template>
  <Transition :name="isOpen ? 'open' : 'close'">
    <component :is="isOpen ? ToggleBigSidebar : ToggleSmallSidebar">
      <template #header>
        <span v-if="!isOpen" class="">Bárbara</span>
        <span v-if="isOpen" class="inner">Bárbara Belize Moreira Boechat</span>
      </template>
    </component>
  </Transition>
  <button @click="toggleSidebar()">
    <span v-if="isOpen">Fechar</span>
    <span v-if="!isOpen">Abrir</span>
  </button>
</template>
<script setup lang="ts">
import { ref } from "vue";
/* import { twMerge } from "tailwind-merge"; */

import ToggleBigSidebar from "./ToggleBigSidebar.vue";
import ToggleSmallSidebar from "./ToggleSmallSidebar.vue";

const isOpen = ref(true);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
</script>
<style scoped>
.open-enter-active,
.close-leave-active {
  transition: all 0.4s ease;
}

.open-enter-from,
.close-leave-to {
  width: 0px;
}

.open-enter-active .inner,
.close-leave-active .inner {
  transition: all 0.15s ease-in-out;
}

.open-enter-from .inner,
.close-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
</style>
