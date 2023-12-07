<template>
    <div class="flex items-center space-x-1">
        <span v-if="showRatingValue" class="text-sm font-medium text-gray-400"> {{ rating }}</span>
        <template v-for="index in Math.ceil(maxRating)">
            <SolidStarIcon v-if="index <= rating" class="w-3 h-3 text-yellow-300" />
            <StarIcon v-else class="w-3 h-3 text-yellow-300" />
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
    },
    showRatingValue: {
        type: Boolean,
        default: false
    }
})

const maxRating = 5;
</script>