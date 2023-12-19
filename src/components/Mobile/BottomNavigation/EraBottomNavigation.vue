<template>
  <div
    class="fixed bottom-0 left-0 z-20 w-full h-16 bg-white border-t border-gray-200"
  >
    <div class="flex h-full max-w-lg mx-auto font-medium">
      <template
        v-for="btnNavigation in buttonsForNavigation"
        v-bind:key="btnNavigation.label"
      >
        <button
          @click="emitChangeRoute(btnNavigation.route)"
          type="button"
          class="inline-flex flex-col grow items-center justify-center px-5 hover:bg-gray-50 group"
        >
          <component
            :is="btnNavigation.icon"
            class="w-5 h-5 mb-2 text-gray-500 group-hover:text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          />

          <span
            class="text-xs text-gray-500 group-hover:text-blue-600 font-medium"
            >{{ btnNavigation.label }}
          </span>
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

type ButtonNavigation = { icon: string; label: string; route: string };

defineProps({
  buttonsForNavigation: {
    type: Array as PropType<Array<ButtonNavigation>>,
    default: () => <ButtonNavigation[]>[],
  },
});

const emits = defineEmits(["pushRoute"]);
const emitChangeRoute = (route: string) => {
  emits("pushRoute", route);
};
</script>
