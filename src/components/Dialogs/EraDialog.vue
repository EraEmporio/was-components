<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'radix-vue'
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge'

defineProps({
    dialogStyles: Object,
    default: () => { }
})
</script>

<template>
    <DialogRoot>
        <DialogTrigger
            :class="twMerge('text-grass11 font-semibold hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] leading-none focus:outline-none', dialogStyles.trigger)">
            Edit profile
        </DialogTrigger>
        <DialogPortal>
            <DialogOverlay class="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0 z-30" />
            <DialogContent
                :class="twMerge('data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-[100]', dialogStyles.content)">
                <slot></slot>
                <DialogClose class="text-grass11 hover:bg-green4 focus:shadow-green7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:outline-none
                border-gray-300 border h-6 w-6"
                 aria-label="Close">
                    <Icon class="h-4 w-4" icon="mi:close" />
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>