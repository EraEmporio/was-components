<template>
  <Dropdown
    v-model="filterModel"
    @change="filterCallback()"
    :options="[...(col.filter ? col.filter.options : [])]"
    placeholder="Selecione um"
    class="p-column-filter"
    optionLabel="name"
    optionValue="value"
    :showClear="true"
  >
    <template #option="slotProps">
      <Tag :value="slotProps.option.name" v-bind="slotProps.option" />
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ColumnFilterModelType } from "primevue/column";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";

import { ItemColum } from "../EraDataTable.vue";
import { PropType } from "vue";

defineProps({
  col: {
    type: Object as PropType<ItemColum>,
    default: () => {
      return {
        filter: {
          options: [],
        },
      };
    },
  },
  filterCallback: {
    type: Function,
    default: () => {
      // Implement your filter callback logic here
    },
  },
});

const filterModel = defineModel<ColumnFilterModelType>();
</script>
