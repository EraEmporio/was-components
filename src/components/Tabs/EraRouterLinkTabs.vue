<template>
  <div class="card">
    <TabView
      :scrollable="true"
      v-bind="$attrs"
      @tab-change="
        (e) => {
          emits('changeRoute', tabGroup[e.index].name);
        }
      "
    >
      <TabPanel
        v-for="(tab, index) in tabGroup"
        v-bind:key="index"
        :header="tab.label"
      >
        <slot></slot>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";

type RouterTab = {
  name: string;
  label: string;
};

defineOptions({
  inheritAttrs: false,
});

defineProps({
  tabGroup: {
    type: Array as PropType<Array<RouterTab>>,
    default: () => <RouterTab[]>[],
  },
});

/* const scrollableTabs = ref(
  Array.from({ length: 50 }, (_, i) => ({
    title: `Tab ${i + 1}`,
    content: `Tab ${i + 1} Content`,
  }))
); */

const emits = defineEmits(["changeRoute"]);
</script>
