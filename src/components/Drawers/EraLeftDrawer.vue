<template>
  <!-- drawer component -->
  <div
    :id="id"
    tabindex="-1"
    :aria-labelledby="id"
    :class="
      twMerge(
        'w-full md:w-[40%] lg:w-[35%] xl:w-[27%] 2xl:w-[24%] fixed top-0 left-0 z-40 h-dvh overflow-y-auto transition-transform -translate-x-full bg-white shadow-sm',
        styling.drawer
      )
    "
  >
    <button
      v-if="showCloseButton"
      :id="'close' + id"
      type="button"
      :data-drawer-hide="id"
      :aria-controls="id"
      @click="closeDrawer"
      :class="
        twMerge(
          'left-drawer--closebtn w-8 h-8 absolute z-[90] top-2.5 end-2.5 inline-flex items-center justify-center bg-white hover:bg-gray-200 rounded-full text-sm text-gray-600 hover:text-gray-900',
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
import { PropType, onMounted, ref } from "vue";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/vue";

import { Drawer } from "flowbite";
import type { DrawerOptions, DrawerInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";

type LeftDrawerStyle = {
  drawer: string;
  title: string;
  closebtn: string;
};

const showCloseButton = ref(false);
const setCloseButtonVisibility = (visibility: boolean) => {
  showCloseButton.value = visibility;
};

const props = defineProps({
  id: {
    type: String,
    default: "",
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
  startOpen: {
    type: Boolean,
    default: false,
  },
  backdrop: {
    type: Boolean,
    default: false,
  },
});

const drawerRef = ref({});
const emits = defineEmits(["onHide", "onToggle", "onShow"]);

const hideDrawer = () => {
  const closeButton = document.getElementById("close" + props.id);
  closeButton?.click();
};

const showDrawer = () => {
  (drawerRef.value as DrawerInterface).show();
};

const closeDrawer = () => {
  (drawerRef.value as DrawerInterface).hide();
};

onMounted(() => {
  const $targetEl: HTMLElement | null = document.getElementById(props.id);

  // options with default values
  const options: DrawerOptions = {
    placement: "left",
    backdrop: props.backdrop,
    onHide: () => {
      emits("onHide");
      showCloseButton.value = false;
    },
    onShow: () => {
      emits("onShow");
      showCloseButton.value = true;
    },
    onToggle: () => {
      emits("onToggle");
    },
  };

  // instance options object
  const instanceOptions: InstanceOptions = {
    id: props.id,
  };

  /*
   * $targetEl (required)
   * options (optional)
   * instanceOptions (optional)
   */
  drawerRef.value = new Drawer($targetEl, options, instanceOptions);

  // show the drawer

  if (props.startOpen) {
    showDrawer();
    return;
  }
});

defineExpose({ drawerRef, setCloseButtonVisibility, closeDrawer, hideDrawer, showDrawer });
</script>
