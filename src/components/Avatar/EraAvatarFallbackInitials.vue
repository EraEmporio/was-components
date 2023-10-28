
<template>
    <AvatarRoot
        :class="twMerge('bg-blackA3 inline-flex h-[92px] w-[92px] select-none items-center justify-center overflow-hidden rounded-full align-middle', avatarStyle.root)">
        <AvatarImage :class="twMerge('h-full w-full rounded-[inherit] object-cover', avatarStyle.image)"
            :src="profile.photo" :alt="profile.name" />
        <AvatarFallback
            :class="twMerge('text-grass11 leading-1 flex h-full w-full items-center justify-center bg-gray-200 text-[15px] font-medium text-sm', avatarStyle.fallback)"
            :delay-ms="300">
            {{ initials }}
        </AvatarFallback>
    </AvatarRoot>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { twMerge } from 'tailwind-merge';
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue';

type AvatarStyle = {
    root: string,
    image: string,
    fallback: string,
};

const props = defineProps({
    profile: {
        type: Object,
        required: true,
        default: () => { }
    },
    avatarStyle: {
        type: Object as PropType<AvatarStyle>,
        default: () => <AvatarStyle>{ root: '', image: '', fallback: '' },
    }
})

const initials = computed(() => {
    const { name } = props.profile
    return name.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
})

</script>