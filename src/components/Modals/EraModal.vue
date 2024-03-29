<template>
  <div
    :id="id"
    :data-modal-backdrop="backdrop"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-dvh max-h-dvh"
  >
    <div
      :class="
        twMerge(
          'modal-wrapper relative px-4 py-4 w-full max-w-2xl max-h-full',
          styling.wrapper
        )
      "
    >
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
              'modal-content--header flex items-center justify-between px-4 py-4 md:px-5 md:py-5 rounded-t',
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
            :data-modal-hide="id"
            :id="'close' + id"
            class="text-inherit top-0 absolute p-0.5"
          ></button>
          <button
            @click="hideModal()"
            class="modal-header--closebtn text-slate-400 bg-transparent active:bg-slate-100 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <slot :closeModal="hideModal" name="body"></slot>
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
</template>

<script setup lang="ts">
import { Modal } from "flowbite";
import type { modalBackdrop, InstanceOptions, ModalOptions } from "flowbite";

import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";
import { PropType, onMounted, ref } from "vue";

type EraModalStyle = {
  wrapper: string;
  container: string;
  header: string;
  body: string;
  footer: string;
};

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  backdrop: String as PropType<modalBackdrop>,
  closable: {
    type: Boolean,
    default: true,
  },
  styling: {
    type: Object as PropType<EraModalStyle>,
    default: () => {
      return {
        wrapper: "",
        container: "",
        header: "",
        body: "",
        footer: "",
      };
    },
  },
});

const modalRef = ref({});

onMounted(() => {
  const $modalElement: HTMLElement | null = document.getElementById(props.id);

  const modalOptions: ModalOptions = {
    backdrop: props.backdrop,
    /*   backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40", */
    closable: props.closable,
    onHide: () => {
      const backdrop = document.querySelector(
        "[modal-backdrop]"
      ) as HTMLElement;
      backdrop.style.display = "none";
    },
    onShow: () => {
      const newDiv = document.createElement("div");
      newDiv.setAttribute("modal-backdrop", "");

      const app = document.getElementById("app");
      document.body.insertBefore(newDiv, app);
    },
    onToggle: () => {},
  };

  // instance options object
  const instanceOptions: InstanceOptions = {
    id: props.id,
    override: true,
  };

  modalRef.value = new Modal($modalElement, modalOptions, instanceOptions);
});

const removeAllBackdrops = () => {
  /* hideModal(); */
  const backdrop = document.querySelector("[modal-backdrop]") as HTMLElement;
  /* backdrop.style.display = "none"; */
  if (backdrop) {
    backdrop.remove();
  }
};

const hideModal = () => {
  const closeButton = document.getElementById("close" + props.id);
  closeButton?.click();
  removeAllBackdrops();
};

defineExpose({ modalRef, hideModal });
</script>
