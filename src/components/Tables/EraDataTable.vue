<template>
  <DataTable v-model:filters="filters" :value="items">
    <Column
      v-for="col of columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      v-bind="{ ...col.props }"
    >
      <template #body="slotProps" v-if="col.type == 'tag'">
        <Tag
          :value="slotProps.data[col.field]"
          v-bind="col.props.tag ? col.props.tag(slotProps.data) : {}"
        />
      </template>

      <template #filter="{ filterModel, filterCallback }" v-if="col.filter">
        <component
          :is="filterComponents[col.filter.type]"
          v-model="filterModel.value"
          :filterCallback="filterCallback"
          :col="col"
        />
      </template>
    </Column>

    <Column header="Ações" v-if="actions.length > 0" :exportable="false">
      <template #body="slotProps">
        <div class="actions-wrapper">
          <Button
            v-for="{ icon, color, action, disabled } of actions.filter(
              (action) => action.permission(slotProps.data)
            )"
            :disabled="disabled(slotProps.data)"
            @click="action(slotProps.data)"
            :key="icon"
          >
            <Icon :icon="icon" :class="twMerge('w-5 h-auto text-sm', color)" />
          </Button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column, { ColumnProps } from "primevue/column";
import Tag, { TagProps } from "primevue/tag";
import { Icon } from "@iconify/vue";
import { PropType, markRaw } from "vue";
import { twMerge } from "tailwind-merge";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import SelectFilterTag from "./Filters/SelectFilterTag.vue";
import { useAttrs } from "vue";
import { useFilterTable } from "./Filters/useFilterTable";

const attrs = useAttrs();

const filterComponents = {
  SelectFilterTag: markRaw(SelectFilterTag),
};

export type ItemColum = {
  field: string;
  header: string;
  type?: "tag" | "download" | "actions";
  props: ColumnProps & { tag?: (item: any) => TagProps };
  filter?: {
    operator: keyof typeof FilterOperator;
    matchMode: keyof typeof FilterMatchMode;
    type: keyof typeof filterComponents;
    options: any[];
  };
};

type Action = {
  color: string;
  icon: string;
  action: (item: any) => void;
  permission: (item: any) => boolean | true;
  disabled: (item: any) => boolean | false;
};

const props = defineProps({
  items: {
    type: Array as PropType<Array<any>>,
    default: () => <any[]>[],
  },
  columns: {
    type: Array as PropType<Array<ItemColum>>,
    default: () => <ItemColum[]>[],
  },
  actions: {
    type: Array as PropType<Array<Action>>,
    default: () => <Action[]>[],
  },
});

defineOptions({
  inheritAttrs: true,
});

const { filters } = useFilterTable(attrs.filterDisplay, props.columns);
</script>
