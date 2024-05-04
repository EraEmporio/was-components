<template>
  <div class="autocomplete-search-wrapper inline-flex items-center ">
    <Icon
      icon="ion:search-outline"
      class="w-4.5 h-auto relative z-10 -right-[28px] text-mercury-500 bg-white py-1"
    />
    <AutoComplete
      v-model="value"
      class="inputSearch !border-none"
      :suggestions="filtered"
      @complete="search"
      placeholder="Pesquisar"
      v-bind="$attrs"
    >
      <template v-for="(_, slot) in slots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope || {}"></slot>
      </template>
    </AutoComplete>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import AutoComplete from "primevue/autocomplete";
import { FilterMatchMode, FilterService } from "primevue/api";
import { ref, toRef, useAttrs, useSlots } from "vue";

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();
const slots = useSlots();

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  optionFilter: {
    type: String,
    default: "filter",
  },
});

const suggestions = toRef(props, "items");
const filtered = ref();
const value = ref();

const handleSuggestion = (suggestion) => {
  if (!attrs["option-group-children"]) return [suggestion];

  const newSuggestion = [
    suggestion,
    ...suggestion[attrs["option-group-children"]],
  ];
  return newSuggestion.flat(1);
};

const search = (event) => {
  let query = event.query;
  let newFiltered = [];

  for (let suggestion of suggestions.value) {
    let filteredItems = FilterService.filter(
      handleSuggestion(suggestion),
      [props.optionFilter],
      query,
      FilterMatchMode.CONTAINS
    );

    if (filteredItems && filteredItems.length) {
      newFiltered = [...newFiltered, ...filteredItems];
    }
  }

  filtered.value = newFiltered;
};
</script>

<style>
.inputSearch input {
  /*  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 512 512'%3E%3Cpath fill='none' stroke='%23000' stroke-miterlimit='10' stroke-width='32' d='M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z'/%3E%3Cpath fill='none' stroke='%23000' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M338.29 338.29L448 448'/%3E%3C/svg%3E");
  background-size: 1.3em;
  background-position: left;
  background-repeat: no-repeat; */
  text-indent: 20px;
}
</style>
