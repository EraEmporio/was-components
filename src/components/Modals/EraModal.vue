<template>
  <div
    :id="id"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="modal-wrapper relative p-4 w-full max-w-2xl max-h-full">
      <div
        :class="
          twMerge(
            'modal-container relative bg-white rounded-[30px] shadow mx-4',
            styling.container
          )
        "
      >
        <div
          :class="
            twMerge(
              'modal-content--header flex items-center justify-between p-4 md:p-5 rounded-t',
              styling.header
            )
          "
        >
          <h3
            class="modal-header--title grow text-center font-light text-slate-800 dark:text-white"
          >
            <slot name="header"></slot>
          </h3>
          <button
            type="button"
            class="modal-header--closebtn text-slate-400 bg-transparent active:bg-slate-100 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            :data-modal-hide="id"
          >
            <Icon icon="ic:round-close" class="w-5 h-5" />
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div
          :class="
            twMerge(
              'modal-content--body px-6 py-1 flex flex-col items-center gap-6',
              styling.body
            )
          "
        >
          <slot name="body"></slot>
        </div>
        <div
          :class="
            twMerge(
              'modal-content--footer flex items-center p-4 md:p-5 rounded-b',
              styling.footer
            )
          "
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
  <!-- toggle modal button
    <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        class="modal-help-button rounded-md px-4 py-2 text-sm font-bold text-gray-600 bg-transparent active:bg-slate-100 border-t border-b border-gray-200"
        type="button"
      >
        <Icon icon="material-symbols:help" />
    </button> 
  -->
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";
import { PropType } from "vue";

type EraModalStyle = {
  container: string;
  header: string;
  body: string;
  footer: string;
};

defineProps({
  id: String,
  styling: {
    type: Object as PropType<EraModalStyle>,
    default: () => {
      return {
        container: "",
        header: "",
        body: "",
        footer: "",
      };
    },
  },
});
</script>
