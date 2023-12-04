<template>
  <div
    v-for="(badge, index) in refBadges"
    v-bind:key="index"
    :class="
      twMerge(
        'filter-badge inline-flex items-center py-1 px-3 gap-1.5 rounded-full bg-slate-200',
        styles
      )
    "
  >
    <Icon :icon="badge.icon" class="w-3 h-auto" />
    <span class="text-sm whitespace-nowrap">{{ badge.label }}</span>
    <!-- <button @click="emits('removeBadge', badge)">
      <Icon icon="tabler:x" class="w-3 h-auto" />
    </button> -->
  </div>
</template>

<script lang="ts" setup>
import { toRef } from "vue";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";

export type BadgeType = {
  label: string;
  value: string;
  icon: string;
};

const props = defineProps({
  styles: {
    type: String,
    default: "",
  },
  badges: {
    type: Array<BadgeType>,
    default: () => <BadgeType[]>[],
  },
});

const refBadges = toRef(props, "badges");
/* const emits = defineEmits(["removeBadge"]); */
</script>
