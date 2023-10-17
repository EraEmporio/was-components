<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger, TabsContent } from 'radix-vue'
import { PropType } from 'vue';
import { twMerge } from 'tailwind-merge';

type EraTabs = {
    name: string,
    refName: string,
    component: any,
    componentProps: Object
}

type TabStyle = {
    tabsRoot?: string,
    tabsList?: string,
    tabsTrigger?: string,
    tabsContent?: string,
}

defineProps({
    tabs: {
        type: Array as PropType<EraTabs[]>,
    },
    defaultTab: {
        type: String
    },
    tabStyle: {
        type: Object as PropType<TabStyle>,
        default: () => <TabStyle>{ tabsContent: '', tabsList: '', tabsRoot: '', tabsTrigger: '' }
    }
})
</script>

<template>
    <TabsRoot :class="twMerge('flex flex-col w-full sm:w-[300px]', tabStyle.tabsRoot)" :default-value="defaultTab">
        <TabsList :class="twMerge('shrink-0 flex border-b border-mauve6', tabStyle.tabsList)"
            aria-label="Manage your account">
            <TabsTrigger v-for="tab, index in tabs" v-bind:key="index" :value="tab.refName"
                :class="twMerge('bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-grass11 data-[state=active]:border-blue-600 data-[state=active]:border-b-4 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:text-blue-600 data-[state=active]:font-medium outline-none cursor-default', tabStyle.tabsTrigger)">
                {{ tab.name }}
            </TabsTrigger>
        </TabsList>
        <TabsContent v-for="{ refName, componentProps, component } in tabs"
            :class="twMerge('grow py-3 bg-white rounded-b-md outline-none', tabStyle.tabsContent)" :value="refName">
            <component :is="component" v-bind="componentProps" />
        </TabsContent>
    </TabsRoot>
</template>