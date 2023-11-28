<template>
  <div
    id="default-carousel"
    :class="twMerge('relative w-full', wrappers.container)"
    data-carousel="slide"
  >
    <div
      :class="
        twMerge('carousel-wrapper relative overflow-hidden', wrappers.wrapper)
      "
    >
      <div
        v-for="(item, index) in items"
        v-bind:key="index"
        :class="twMerge('hidden duration-700 ease-in-out', wrappers.item)"
        data-carousel-item
      >
      <slot :name="item" >
      </slot>
      </div>
    </div>

    <div
      v-if="indicators.show"
      :class="
        twMerge(
          'absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse',
          indicators.styling.container
        )
      "
    >
      <button
        type="button"
        :class="twMerge('w-3 h-3 rounded-full', indicators.styling.indicator)"
        aria-current="true"
        aria-label="Slide 1"
        data-carousel-slide-to="0"
      ></button>
    </div>

    <button
      v-if="controls.show"
      type="button"
      :class="
        twMerge(
          'absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none',
          controls.styling.container
        )
      "
      data-carousel-prev
    >
      <span
        :class="
          twMerge(
            'inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none',
            controls.styling.icon
          )
        "
      >
        <Icon icon="ion:chevron-left" class="w-4 h-4" />
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button
      v-show="controls.show"
      type="button"
      :class="
        twMerge(
          'absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none',
          controls.styling.container
        )
      "
      data-carousel-next
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none"
      >
        <Icon icon="ion:chevron-right" class="w-4 h-4"/>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import * as type from "./constants";
import { twMerge } from "tailwind-merge";
import { PropType } from "vue";

defineProps({
  indicators: {
    type: Object as PropType<type.Indicators>,
    default: () => {
      return {
        show: false,
        styling: {
          container: "",
          indicator: "",
        },
      };
    },
  },
  controls: {
    type: Object as PropType<type.Controls>,
    default: () => {
      return {
        show: false,
        styling: {
          container: "",
          icon: "",
        },
      };
    },
  },
  wrappers: {
    type: Object as PropType<type.Styling>,
    default: () => {
      return {
        container: "",
        wrapper: "",
        item: "",
      };
    },
  },
  items: {
    type: Array<String>,
    default: () => [],
  },
});
</script>
