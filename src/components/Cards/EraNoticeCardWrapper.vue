<template>
  <div
    :class="
      twMerge('notice-container grow space-y-1 p-2 pt-0 pr-[5px]', style)
    "
  >
    <era-notice-card
      v-for="(noticeCard, index) in noticeCards"
      v-bind:key="index"
      :noticeCard="noticeCard"
    />
<div class="empty-cards w-full h-full flex flex-col items-center justify-center rounded-lg border border-mercury-100 " v-show="noticeCards.length == 0">
    <img src="../../assets/images/illustration/Warning-rafiki.svg" alt="Não há novos avisos" class="w-32 h-auto"/>
    <span class="text-sm">Você não possui avisos.</span>
</div>  
</div>
  
</template>

<script setup lang="ts">
import EraNoticeCard from "./EraNoticeCard.vue";
import { twMerge } from "tailwind-merge";
import { NoticeCard } from "./constants";

defineProps({
  noticeCards: {
    type: Array<NoticeCard>,
    default: () => [],
  },
  style: {
    type: String,
    default: ''
  },
});
</script>

<style lang="scss" scoped>
.notice-container {
  scroll-behavior: smooth;
  overflow: auto;
  transition: overflow 1s ease;
}

.notice-container::-webkit-scrollbar {
  width: 8px;
  background-color: inherit;
}
.notice-container::-webkit-scrollbar-thumb {
  background-color: #E6E7E8;
}
.notice-container::-webkit-scrollbar-thumb:hover{
    background-color: #b7bdc9;
    transition: background-color 1s ease-in-out 1s
}
</style>