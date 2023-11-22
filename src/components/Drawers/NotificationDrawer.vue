<template>
  <div
    id="drawer-right-example"
    class="fixed top-0 right-0 z-40 w-screen md:w-1/3 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <h5
      id="drawer-right-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
    >
      Notificações
    </h5>
    <button
      type="button"
      data-drawer-hide="drawer-right-example"
      aria-controls="drawer-right-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <Icon icon="tabler:x" class="w-4 h-auto" />
      <span class="sr-only">Close menu</span>
    </button>

    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Supercharge your hiring by taking advantage of our
      <a
        href="#"
        class="text-blue-600 underline font-medium dark:text-blue-500 hover:no-underline"
        >limited-time sale</a
      >
      for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked
      candidates and the #1 design job board.
    </p>
    <div class="grid grid-cols-2 gap-4">
      <a
        href="#"
        class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >Learn more</a
      >
      <a
        href="#"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >Get access
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<style lang="scss">
[drawer-backdrop] {
  background-color: black;
  opacity: 0.10;
}
</style>
