<template>
  <!-- drawer init and toggle -->
  <!--  
          <div class="text-center">
              <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2   focus:outline-none 
              type="button"
              :data-drawer-target="id"
              :data-drawer-show="id"
              data-drawer-placement="left"
              :aria-controls="id"
              >
              Show left drawer
              </button>
          </div> 
      -->

  <!-- drawer component -->
  <div
    :id="id"
    tabindex="-1"
    :aria-labelledby="id"
    :class="
      twMerge(
        'w-full md:w-[40%] xl:w-[24%] fixed top-0 left-0 z-40 h-dvh p-4 overflow-y-auto transition-transform -translate-x-full bg-white shadow-sm',
        styling.drawer
      )
    "
  >
    <button
      type="button"
      :data-drawer-hide="id"
      :aria-controls="id"
      :class="
        twMerge(
          'left-drawer--closebtn w-8 h-8 z-50 absolute top-2.5 end-2.5 inline-flex items-center justify-center bg-white hover:bg-gray-200 rounded-full text-sm text-gray-600 hover:text-gray-900',
          styling.closebtn
        )
      "
    >
      <Icon :icon="btnicon" />
      <span class="sr-only">Close menu</span>
    </button>
    <div class="drawer-content--wrapper h-full">
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

type LeftDrawerStyle = {
  drawer: string;
  title: string;
  closebtn: string;
};

defineProps({
  id: {
    type: String,
  },
  btnicon: {
    type: String,
    default: "ph:x",
  },
  styling: {
    type: Object as PropType<LeftDrawerStyle>,
    default: () => {
      return {
        drawer: "",
        title: "",
        closebtn: "",
      };
    },
  },
});
</script>
