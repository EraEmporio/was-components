<template>
  <PanelMenu
    v-model:expandedKeys="expandedKeys"
    :model="items"
    class="w-full md:w-[20rem]"
    v-bind="$attrs"
  >
    <template #headericon="{ item }">
      <slot name="topLevelMenuIcon" :item="item">
        <Icon
          :icon="item.icon"
          :class="twMerge('w-5 h-auto text-white', item.style)"
        />
      </slot>
    </template>

    <template #itemicon="{ item }">
      <slot name="lowLevelItemIcon" :item="item">
        <Icon
          :icon="item.icon"
          :class="twMerge('w-5 h-auto text-white', item.style)"
        />
      </slot>
    </template>

  </PanelMenu>
</template>

<script lang="ts" setup>
import { twMerge } from "tailwind-merge";

import { MenuItem } from "primevue/menuitem";
import PanelMenu, { PanelMenuExpandedKeys } from "primevue/panelmenu";
import { PropType } from "vue";

const expandedKeys = defineModel<PanelMenuExpandedKeys>({});

defineOptions({
  inheritAttrs: false,
});

defineProps({
  items: {
    type: Array as PropType<Array<MenuItem>>,
    default: () => <MenuItem[]>[],
  },
});
</script>
