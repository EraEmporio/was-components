<template>
  <div class="lobby-container flex flex-col gap-2">
    <section-title :title="title" :class="titleStyle"/>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import SectionTitle from "../Titles/SectionTitle.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  titleStyle: {
    type: String,
    default: ''
  }
});
</script>
