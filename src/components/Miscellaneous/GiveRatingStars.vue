<template>
    <div class="flex items-center space-x-1">
        <template v-for="index in Math.ceil(maxRating)">
            <SolidStarIcon v-if="index <= rating" @click="rate(index)" class="w-4 h-4 text-yellow-300" />
            <StarIcon v-else @click="rate(index)" class="w-4 h-4 text-yellow-300" />
        </template>
    </div>
</template>

<script lang="ts" setup>
import { StarIcon } from '@heroicons/vue/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/vue/24/solid'

import { ref } from 'vue'

const maxRating = 5;

const rating = ref(0)
const emits = defineEmits(['starsChange'])

const rate = (index : number) => {
    rating.value = index;
    emits('starsChange', rating)
}
</script>