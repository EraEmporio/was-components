<template>
    <div
        class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex h-full max-w-lg  mx-auto font-medium">
            <template v-for="btnNavigation in buttonsForNavigation" v-bind:key="btnNavigation.label">
                <button type="button"
                    class="inline-flex flex-col grow items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <component :is="btnNavigation.icon"
                        class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                        fill="currentColor" viewBox="0 0 20 20" />

                    <span @click="emitChangeRoute(btnNavigation.route)"
                        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">{{
                            btnNavigation.label }}
                    </span>
                </button>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, onMounted } from 'vue';

type ButtonNavigation = { icon: string, label: string, route: string };

const props = defineProps({
    buttonsForNavigation: {
        type: Array as PropType<Array<ButtonNavigation>>,
        default: () => <ButtonNavigation[]>[]
    }
})

const emits = defineEmits(['pushRoute'])
const emitChangeRoute = (route: string) => {
    emits("pushRoute", route);
}

onMounted(() => {
    console.log(props.buttonsForNavigation)
})
</script>