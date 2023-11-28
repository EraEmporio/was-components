<template>
  <div class="list-wrapper h-full flex flex-col gap-2">
    <EraSearchInput
      class="pt-6"
      :searchInputStyle="{
        input: 'focus:ring-0 bg-transparent rounded-full h-[45px]',
        label: '',
      }"
      @searchInput="search"
    />
    <div
      class="alphabet-list-wrapper--filterLis flex flex-row gap-3 justify-between overflow-hidden"
      style="height: calc(100vh - 227px)"
    >
      <div
        class="alphabet-list-wrapper--sidebar py-2 flex flex-col items-center justify-start gap-2 overflow-auto"
      >
        <div v-for="letter in alphabet" class="alphabet-option">
          <div
            @click="scrollToOption(letter)"
            class="w-6 h-6 p-2 flex items-center justify-center rounded-full bg-transparent active:bg-blue-300 cursor-pointer"
          >
            <span class="text-xs focus:text-blue-800 font-medium">{{
              letter
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="alphabet-list-wrapper--checkboxe w-full py-4 flex flex-col overflow-auto"
      >
        <form>
          <div
            class="checkboxes-wrapper"
            v-for="(filter, index) in sortedFilters"
            v-bind:key="index"
          >
            <div
              v-if="shouldPrint(getFirstChar(filter.label))"
              :data-alpha="getFirstChar(filter.label)"
              class="checkboxes-wrapper--letter-title"
            >
              {{ getFirstChar(filter.label) }}
            </div>
            <EraCheckbox
              v-bind="{ ...filter }"
             
              @checked="(checked) => whoChecked(filter, checked)"
              class="mb-2"
            />
          </div>
        </form>
      </div>
    </div>
    <button
      @click="emits('applyFilter', checkedCheckboxes)"
      class="w-full h-[48px] py-5 inline-flex justify-center items-center gap-2.5 text-base text-white bg-blue-800 rounded-lg border border-blue-800"
    >
      Aplicar Filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import EraCheckbox from "../Inputs/EraCheckbox.vue";
import EraSearchInput from "../Inputs/EraSearchInput.vue";

type FilterType = { label: string; value: string };

const props = defineProps({
  filters: {
    type: Array<FilterType>,
    default: () => [],
  },
});

const emits = defineEmits(["applyFilter"]);
const alphabet = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((c) => c.toUpperCase());
const currentLetter = ref("");

const sortedFilters = computed(() => {
  if (!props.filters) return [];
  return props.filters.sort((a, b) => a.label.localeCompare(b.label));
});

const getFirstChar = (value: string) => {
  return value.charAt(0).toUpperCase();
};

const shouldPrint = (dataAlpha: string) => {
  if (dataAlpha != currentLetter.value) {
    currentLetter.value = dataAlpha;
    return true;
  }

  return false;
};

const search = (inputSearch: string) => {
  console.log(inputSearch);
  //TODO: implementar busca
};

const highlight = (element: HTMLElement) => {
    let defaultBG = element.style.backgroundColor;
    let defaultTransition = element.style.transition;

    element.style.transition = "background 1s";
    element.style.backgroundColor = "#FDFF47";

    setTimeout(function()
    {
        element.style.backgroundColor = defaultBG;
        setTimeout(function() {
            element.style.transition = defaultTransition;
        }, 1000);
    }, 1000);
}

const scrollToOption = (searchValue: string) => {
  console.log(searchValue);
  const opts = document.querySelectorAll("[data-alpha]");

  opts.forEach((opt) => {
    const value = opt.getAttribute("data-alpha");
    if (value == searchValue) {
      (opt as HTMLElement).scrollIntoView({ behavior: "smooth" });
      highlight((opt as HTMLElement))
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
