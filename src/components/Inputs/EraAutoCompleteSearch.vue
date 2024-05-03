<template>
  <AutoComplete
    v-model="value"
    :suggestions="filtered"
    @complete="search"
    placeholder="🔍 Search"
    :optionLabel="optionLabel"
    :optionGroupChildren="optionGroupChildren"
    :optionGroupLabel="optionGroupLabel"
    v-bind="$attrs"
  >
  <template #footer>
    alguma coisa no footer
  </template>
  </AutoComplete>
</template>

<script setup>
import AutoComplete from "primevue/autocomplete";
import { FilterMatchMode, FilterService } from "primevue/api";
import { ref, toRef } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  searchCallback: {
    type: Function,
    default: () => {},
  },
  optionLabel: {
    type: String,
    default: undefined,
  },
  optionGroupChildren: {
    type: String,
    default: undefined,
  },
  optionGroupLabel: {
    type: String,
    default: undefined,
  },
});

const suggestions = toRef(props, "items");
const filtered = ref();
const value = ref();

const handleSuggestion = (suggestion) => {
  console.log(props.optionGroupChildren);
  if (!props.optionGroupChildren) return suggestion;

  const newSuggestion = [suggestion, ...suggestion[props.optionGroupChildren]];

  return newSuggestion.flat(1);
};

const search = (event) => {
  let query = event.query;

  let newFiltered = [];
  console.log({ optionLabel: props.optionLabel, query });
  for (let suggestion of suggestions.value) {
    console.log({ handleSuggestion: handleSuggestion(suggestion) });
    let filteredItems = FilterService.filter(
      handleSuggestion(suggestion),
      [props.optionLabel],
      query,
      FilterMatchMode.CONTAINS
    );

    console.log(suggestion[props.optionGroupChildren]);

    if (filteredItems && filteredItems.length) {
      newFiltered = [...newFiltered, ...filteredItems];
    }
  }

  filtered.value = newFiltered;
};
</script>
