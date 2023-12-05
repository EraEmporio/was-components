<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger,
} from "radix-vue";

import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";
import { ref, PropType } from "vue";

defineProps({
  dialogStyles: {
    type: Object as PropType<{ trigger: string; content: string }>,
    default: () => {
      return { trigger: "", content: "" };
    },
  },
  btnTrigger: {
    type: Boolean,
    default: true,
  },
  btnTriggerLabel: {
    type: String,
    default: "Open Dialog",
  },
});

const open = ref(false);

defineExpose({
  open,
});
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger
      v-if="btnTrigger"
      :class="
        twMerge(
          'text-grass11 font-semibold hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none focus:outline-none',
          dialogStyles.trigger
        )
      "
    >
      {{ btnTriggerLabel }}
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay
        class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30"
      />
      <DialogContent
        :class="
          twMerge(
            'data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]',
            dialogStyles.content
          )
        "
      >
        <slot></slot>
        <DialogClose
          class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none border-gray-300 border h-8 w-8"
          aria-label="Close"
        >
          <Icon
            class="h-4 w-4"
            icon="mi:close"
            color="rgb(209 213 219 / var(--tw-border-opacity))"
          />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
