<template>
  <DataTable :value="items" v-bind="$attrs">
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      v-bind="col.props"
    >
      <template #body="slotProps" v-if="col.type == 'tag'">
        <Tag :value="slotProps.data[col.field]" v-bind="col.props.tag" />
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column, { ColumnProps } from "primevue/column";
import Tag, { TagProps } from "primevue/tag";

import { PropType } from "vue";

type ItemColum = {
  field: string;
  header: string;
  type?: "tag" | "download" | "actions";
  props: ColumnProps & { tag?: TagProps };
};

defineProps({
  items: {
    type: Array as PropType<Array<any>>,
    default: () => <any[]>[],
  },
  columns: {
    type: Array as PropType<Array<ItemColum>>,
    default: () => <ItemColum[]>[],
  },
});

defineOptions({
  inheritAttrs: true,
});
</script>
