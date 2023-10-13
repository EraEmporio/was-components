<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { twMerge } from 'tailwind-merge';

defineProps({
    icon: {
        type: String,
        default: 'radix-icons:mixer-horizontal'
    },
    btnStyle: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <button type="button"
        :class="twMerge('rounded-full w-[45px] h-[45px] inline-flex items-center justify-center bg-blue-900 text-white hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-blue-800 cursor-default outline-none', btnStyle)">
        <Icon :icon="icon" />
    </button>
</template>


