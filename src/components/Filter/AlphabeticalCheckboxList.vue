<template>
  <div class="list-wrapper h-full flex flex-col gap-2 grow">
    <EraSearchInput
      class="pt-6"
      :searchInputStyle="{
        input: 'focus:ring-0 bg-transparent rounded-full h-[45px]',
        label: '',
      }"
      @searchInput="search"
    />
    <div
      class="filter-wrapper flex flex-col gap-2"
      style="height: calc(100vh - 227px)"
    >
      <div class="filter-wrapper--showBadges flex flex-row flex-wrap gap-1">
        <era-filter-badge :badges="tempBadges" @removeBadge="uncheck" />
      </div>
      <div
        class="filter-wrapper--alphalist grow flex flex-row gap-2 justify-between overflow-hidden"
      >
        <div
          class="alphabet-list-wrapper--sidebar px-1 py-2 flex flex-col items-center justify-start gap-2 overflow-y-auto overflow-x-hidden"
        >
          <div v-for="letter in alphabet" class="alphabet-option mr-2">
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
          class="alphabet-list-wrapper--checkboxe w-full flex flex-col overflow-auto"
        >
          <div
            class="checkboxes-wrapper mr-3"
            v-for="(letterGroup, i) in (letterGroups as Array<DataAlpha>)"
            v-bind:key="i"
          >
            <div class="letter-group pb-4">
              <div
                class="letter-title sticky top-0 p-1 bg-white/70 backdrop-blur-sm border-b border-gray-300"
                :data-alpha="letterGroup.letter"
              >
                {{ letterGroup.letter }}
              </div>
              <div class="letter-filters-group py-1">
                <EraCheckbox
                  class="checkbox-filter my-1"
                  v-for="(filter, j) in letterGroup.filters"
                  v-bind="filter"
                  v-bind:key="j"
                  :initial-value="
                    filterState.findIndex(
                      (state) => state.value == filter.value
                    ) != -1 ||
                    checkedCheckboxes.findIndex(
                      (state) => state.value == filter.value
                    ) != -1
                  "
                  @checked="(checked) => whoChecked(filter, checked)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="emits('applyFilter', checkedCheckboxes)"
      :class="
        twMerge(
          'w-full h-[48px] py-5 inline-flex justify-center items-center gap-2.5 text-base text-white bg-blue-800 rounded-lg border border-blue-800',
          checkedCheckboxes.length == 0
            ? 'bg-slate-200 border-slate-200 pointer-events-none'
            : ''
        )
      "
    >
      Selecionar Filtros
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, toRef } from "vue";
import EraFilterBadge from "../Badges/EraFilterBadge.vue";
import EraCheckbox from "../Inputs/EraCheckbox.vue";
import EraSearchInput from "../Inputs/EraSearchInput.vue";
import { twMerge } from "tailwind-merge";

type FilterType = { label: string; value: string };
type DataAlpha = { letter: string; filters: Array<FilterType> };
type BadgeType = {
  label: string;
  value: string;
  icon: string;
};

const props = defineProps({
  filters: {
    type: Array<FilterType>,
    default: () => <FilterType[]>[],
  },
  filterState: {
    type: Array<FilterType>,
    default: () => <FilterType[]>[],
  },
  badges: {
    type: Array<BadgeType>,
    default: () => <BadgeType[]>[],
  },
  icon: {
    type: String,
    default: "",
  },
});

const refBadges = toRef(props, "badges");
const tempBadges = ref([...refBadges.value]);
const emits = defineEmits(["applyFilter", "search"]);
const alphabet = "abcdefghijklmnopqrstuvwxyz"
  .split("")
  .map((c) => c.toUpperCase());

const letterGroups = computed(() => {
  console.log(props.filterState, "filterstate");
  if (!props.filters) return [];
  const sorted = props.filters.sort((a, b) => a.label.localeCompare(b.label));

  const dataAlpha = <DataAlpha[]>[];

  alphabet.forEach((letter: string) => {
    let filters = sorted.filter((x) => getFirstChar(x.label) == letter);
    dataAlpha.push({
      letter,
      filters,
    });
  });

  return dataAlpha;
});

const getFirstChar = (value: string) => {
  return value.charAt(0).toUpperCase();
};

const search = (inputSearch: string) => {
  console.log({ inputSearch });
  const search =
    inputSearch == "" || inputSearch == undefined ? "%%" : inputSearch;
  emits("search", search);
};

const highlight = (element: HTMLElement) => {
  let defaultBG = element.style.backgroundColor;
  let defaultTransition = element.style.transition;

  element.style.transition = "background 1s";
  element.style.backgroundColor = "#dbdbdb";

  setTimeout(function () {
    element.style.backgroundColor = defaultBG;
    setTimeout(function () {
      element.style.transition = defaultTransition;
    }, 1000);
  }, 1000);
};

const scrollToOption = (searchValue: string) => {
  const opts = document.querySelectorAll("[data-alpha]");

  opts.forEach((opt) => {
    const value = opt.getAttribute("data-alpha");
    if (value == searchValue) {
      (opt as HTMLElement).scrollIntoView({ behavior: "smooth" });
      highlight(opt as HTMLElement);
      return;
    }
  });
};

const uncheck = ({ value }: FilterType) => {
  console.log("uncheck", value);
  checkedCheckboxes.value = checkedCheckboxes.value.filter(
    (checkbox) => checkbox.value != value
  );

  tempBadges.value = tempBadges.value.filter((badge) => badge.value != value);
};

const checkedCheckboxes = ref(<FilterType[]>[...props.filterState]);
const whoChecked = ({ value, label }: FilterType, checked: boolean) => {
  if (!checked) {
    checkedCheckboxes.value = checkedCheckboxes.value.filter(
      (checkbox) => checkbox.value != value
    );
    tempBadges.value = tempBadges.value.filter((badge) => badge.value != value);

    return;
  }

  const hasItem =
    checkedCheckboxes.value.findIndex((checkbox) => checkbox.value == value) !=
    -1;

  if (hasItem) return;

  checkedCheckboxes.value.push({ value, label });
  tempBadges.value.push({ value, label, icon: props.icon });
  console.log(tempBadges.value);
};
</script>
