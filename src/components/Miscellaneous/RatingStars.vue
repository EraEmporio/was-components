<template>
    <div class="flex items-center space-x-1">
        <template v-for="index in maxRating">
            <SolidStarIcon v-if="index <= rating" class="w-4 h-4 text-yellow-300" />
            <StarIcon v-else class="w-4 h-4 text-yellow-300" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid'

defineProps({
    rating: {
        type: Number,
        default: 0
    }
})

const maxRating = 5;
</script>