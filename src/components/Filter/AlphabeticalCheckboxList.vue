<template>
  <div class="alphabet-list-wrapper mt-2">
    <EraSearchInput
      class="grow mb-3"
      :searchInputStyle="{
        input: 'focus:ring-0 bg-transparent rounded-full h-[45px]',
        label: '',
      }"
      @searchInput="search"
    />
    <div
      class="alphabet-list-wrapper--filterLis overflow-y-auto"
      style="height: calc(100vh - 215px)"
    >
      <div
        class="alphabet-list-wrapper--sidebar absolute p-2.5 flex flex-col items-center overflow-y-auto overflow-x-clip"
        style="height: calc(100vh - 230px)"
      >
        <div v-for="letter in alphabet" class="alphabet-option">
          <span
            @click="scrollToOption(letter)"
            class="text-xs hover:text-blue-500 focus:text-blue-500 font-medium cursor-pointer"
          >
            {{ letter }}
          </span>
        </div>
      </div>

      <div
        class="checkboxe relative top-3.5 left-10 gap-y-2 flex flex-col overflow-y-auto max-w-[280px]"
        style="height: calc(100vh - 240px)"
      >
        <form class="gap-y-2">
          <EraCheckbox
            v-for="(filter, index) in filters"
            v-bind:key="index"
            v-bind="{ ...filter }"
            :data-alpha="filter.label.charAt(0).toUpperCase()"
            @checked="(checked) => whoChecked(filter, checked)"
            class="mb-2"
          />
        </form>
      </div>
    </div>
  </div>
  <button
    @click="emits('applyFilter', checkedCheckboxes)"
    class="h-[48px] py-5 mt-4 text-base text-white bg-blue-800 rounded-[10px] border border-blue-800 justify-center items-center gap-2.5 inline-flex w-full"
  >
    Aplicar Filtros
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EraCheckbox from "../Inputs/EraCheckbox.vue";
import EraSearchInput from "../Inputs/EraSearchInput.vue";

type FilterType = { label: string; value: string };

defineProps({
  filters: {
    type: Array<FilterType>,
    default: () => [],
  },
});

const emits = defineEmits(["applyFilter"]);
const alphabet = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((c) => c.toUpperCase());

const search = (inputSearch: string) => {
  console.log(inputSearch);
  //TODO: implementar busca
};

const scrollToOption = (searchValue: string) => {
  console.log(searchValue);
  const opts = document.querySelectorAll("[data-alpha]");

  opts.forEach((opt) => {
    const value = opt.getAttribute("data-alpha");
    if (value == searchValue) {
      (opt as HTMLElement).scrollIntoView({ behavior: "smooth" });
      return;
    }
  });
};

const checkedCheckboxes = ref(<FilterType[]>[]);
const whoChecked = ({ value, label }: FilterType, checked: boolean) => {
  if (!checked) {
    checkedCheckboxes.value = checkedCheckboxes.value.filter(
      (checkbox) => checkbox.value != value
    );

    return;
  }

  const hasItem =
    checkedCheckboxes.value.findIndex((checkbox) => checkbox.value == value) !=
    -1;

  if (hasItem) return;
  checkedCheckboxes.value.push({ value, label });
};
</script>
