<template>
  <nav
    class=" fixed w-full h-20 py-4 px-2 z-20 top-0 start-0 left-0 bg-white border-b border-gray-200"
  >
    <div
      class="h-full max-w-screen-xl flex flex-wrap flex-row justify-center items-center gap-2"
    >
      <button
        ref="hamburguerBtn"
        data-collapse-toggle="navbar-sticky"
        type="button"
        class="absolute top-4 left-2 h-12 w-12 inline-flex items-center justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="navbar-sticky"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <Icon icon="mynaui:menu" class="w-8 h-auto" />
      </button>

      <div class="h-full w-full ml-14 md:!order-2">
          <slot></slot>
      </div>
      <div
        class="w-screen md:!w-auto hidden top:0 md:flex md:!items-center md:!justify-between md:!order-1 "
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col left-0 p-4 mx-2 md:p-0 mt-4 font-medium border shadow-sm border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white"
        >
          <li
            v-for="(btnNavigation, index) in buttonsForNavigation"
            v-bind:key="index"
          >
            <a
              @click="emitChangeRoute(btnNavigation.route)"
              :class="checkIfIsSelected(btnNavigation.route)"
              >{{ btnNavigation.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, PropType } from "vue";
import { initFlowbite } from "flowbite";
import { Icon } from "@iconify/vue";
import { twMerge } from "tailwind-merge";

type ButtonNavigation = { icon: string; label: string; route: string };

const props = defineProps({
  buttonsForNavigation: {
    type: Array as PropType<Array<ButtonNavigation>>,
    default: () => <ButtonNavigation[]>[],
  },
  currentRoute: {
    type: String,
    default: "/",
  },
});

const hamburguerBtn = ref(null);
const selectedRoute = reactive({ route: props.currentRoute });
const emits = defineEmits(["pushRoute"]);

const closeMenu = () => {
  if (hamburguerBtn.value) (hamburguerBtn.value as HTMLElement).click();
};

const emitChangeRoute = (route: string) => {
  selectedRoute.route = route;
  emits("pushRoute", route);

  closeMenu();
};

const activeState =
  "block py-2 pl-3 pr-4 text-white bg-blue-800 rounded md:bg-transparent md:text-blue-700 md:p-0";
const normalState =
  "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0";

const checkIfIsSelected = (route: string) => {
  const routeIsActive =
    route == selectedRoute.route || route == props.currentRoute;
  console.log(props.currentRoute);
  return routeIsActive ? twMerge(normalState, activeState) : normalState;
};

onMounted(() => {
  initFlowbite();
});
</script>
