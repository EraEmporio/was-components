<template>
  <TabsRoot
    :class="
      twMerge('flex flex-col h-full w-full', tabStyle.tabsRoot)
    "
    :default-value="defaultTab"
  >
    <TabsList
      :class="
        twMerge(
          'shrink-0 w-full flex border-b border-gray-200 ',
          tabStyle.tabsList
        )
      "
      aria-label="Manage your account"
    >
      <TabsTrigger
        v-for="(tab, index) in tabs"
        v-bind:key="index"
        :value="tab.refName"
        :class="
          twMerge(
            'px-5 h-[45px] flex-1 flex items-center justify-center text-sm leading-none select-none first:rounded-tl-md last:rounded-tr-md border-b-4 border-transparent data-[state=active]:border-blue-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:text-blue-600 data-[state=active]:font-medium outline-none cursor-pointer',
            tabStyle.tabsTrigger
          )
        "
      >
        {{ tab.name }}
      </TabsTrigger>
    </TabsList>
    <div class="content-wrapper h-full overflow-auto">
      <TabsContent
        v-for="{ refName, componentProps, component, on }, index in tabs"
        :class="twMerge('py-3 rounded-b-md outline-none flex flex-col h-full', tabStyle.tabsContent)"
        :value="refName"
        v-bind:key="index"
      >
        <component :is="component" v-bind="componentProps" v-on="on" />
      </TabsContent>
    </div>
  </TabsRoot>
</template>

<script setup lang="ts">
import { TabsList, TabsRoot, TabsTrigger, TabsContent } from "radix-vue";
import { PropType } from "vue";
import { twMerge } from "tailwind-merge";

type EraTabs = {
  name: string;
  refName: string;
  component: any;
  componentProps: Object;
  on: any;
};

type TabStyle = {
  tabsRoot?: string;
  tabsList?: string;
  tabsTrigger?: string;
  tabsContent?: string;
};

defineProps({
  tabs: {
    type: Array as PropType<EraTabs[]>,
  },
  defaultTab: {
    type: String,
  },
  tabStyle: {
    type: Object as PropType<TabStyle>,
    default: () =>
      <TabStyle>{
        tabsContent: "",
        tabsList: "",
        tabsRoot: "",
        tabsTrigger: "",
      },
  },
});
</script>
