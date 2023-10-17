<script setup lang="ts">
import { Icon } from '@iconify/vue'

const emits = defineEmits(['openFilter'])

</script>

<template>
    <button type="button"
        class="rounded-full w-[45px] h-[45px] inline-flex items-center justify-center bg-blue-900 text-white hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-blue-800 cursor-default outline-none"
        @click="emits('openFilter')">
        <Icon icon="radix-icons:mixer-horizontal" />
    </button>
</template>
