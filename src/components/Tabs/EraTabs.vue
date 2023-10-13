<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger } from 'radix-vue'

type EraTabs = {
    name: string,
    refName: string,
    component: any,
    componentProps: Object
}

defineProps({
    tabs: {
        type: Array as PropType<EraTabs[]>,
    },
    defaultTab: {
        type: String
    }
})
</script>

<template>
    <TabsRoot class="flex flex-col w-full sm:w-[300px] shadow-[0_2px_10px] shadow-blackA4" :default-value="defaultTab">
        <TabsList class="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
            <TabsTrigger v-for="tab, index in tabs" v-bind:key="index" :value="tab.refName"
                class="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-grass11 data-[state=active]:text-grass11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="tab1">
                {{ tab.name }}
            </TabsTrigger>
        </TabsList>
        <TabsContent v-for="{ refName, componentProps, component }, index in tabs" v-bind:key="index"
            class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black" :value="refName">
            {{ componentProps }}
            <component :is="component" v-bind="componentProps" />
        </TabsContent>
    </TabsRoot>
</template>