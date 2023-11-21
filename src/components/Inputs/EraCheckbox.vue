<script setup lang="ts">
import { PropType, ref } from "vue";
import { CheckboxIndicator, CheckboxRoot } from "radix-vue";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";

const checkboxOne = ref(false);
const emits = defineEmits(["checked"]);

type CheckboxStyle = {
  root: string;
  indicator: string;
  label: string;
};

defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  styles: {
    type: Object as PropType<CheckboxStyle>,
    default: () => {
      return {
        root: "",
        indicator: "",
        label: "",
      } as CheckboxStyle;
    },
  },
});
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <label
      class="flex flex-row gap-3 items-center [&>.checkbox]:hover:bg-neutral-100"
    >
      <CheckboxRoot
        v-model="checkboxOne"
        :value="value"
        :name="value"
        @update:checked="(checked) => emits('checked', checked)"
        :class="
          twMerge(
            'hover:bg-green3 flex h-[18px] w-[18px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none border border-gray-400',
            styles.root
          )
        "
      >
        <CheckboxIndicator
          :class="
            twMerge(
              'bg-white h-full w-full rounded flex items-center justify-center',
              styles.indicator
            )
          "
        >
          <Icon icon="radix-icons:check" class="h-3.5 w-3.5 text-grass11" />
        </CheckboxIndicator>
      </CheckboxRoot>
      <span :class="twMerge('select-none text-sm', styles.label)">{{
        label
      }}</span>
    </label>
  </div>
</template>
