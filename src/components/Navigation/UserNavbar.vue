<template>
  <nav
    :class="
      twMerge(
        'bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200',
        navConfig.addStyle.navStyle
      )
    "
  >
    <div
      class="nav-container w-full max-w-screen-3xl inline-flex flex-wrap items-center justify-between mx-auto px-4 md:px-10 py-4"
    >
      <a
        :href="navConfig.logo.route"
        class="flex items-center space-x-3 rtl:space-x-reverse"
        :alt="navConfig.logo.label"
      >
        <slot name="logo">
          <Icon icon="ph:x-square-thin" height="30px" width="30px" />
        </slot>

        <span
          :class="
            twMerge(
              'self-center text-2xl font-semibold whitespace-nowrap',
              navConfig.logo.labelStyle
            )
          "
          >{{ navConfig.logo.label }}</span
        >
      </a>
      <div
        class="user-container flex items-center md:order-2 space-x-1 md:space-x-0"
      >
        <div class="extra-container flex items-center space-x-1 md:space-x-0">
          <slot name="extra"></slot>
        </div>
        <button
          type="button"
          class="flex items-center py-1.5 px-2.5 gap-3 md:me-0 rounded-lg hover:bg-black/10 focus:bg-black/5 text-sm font-medium"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          <span class="sr-only">Open user menu</span>
          <era-avatar-fallback-initials
            style="width: 25px; height: 25px"
            :profile="navConfig.profile"
            :avatarStyle="navConfig.avatarStyle"
          />
          <span class="username md:block hidden">{{
            navConfig.profile.name
          }}</span>
          <Icon
            :icon="
              isDropdownOpen
                ? 'majesticons:chevron-up'
                : 'majesticons:chevron-down'
            "
            class="w-5 h-5 md:block hidden text-selenium-800"
          />
        </button>
        <!-- Dropdown menu -->
        <div
          :class="
            twMerge(
              'min-w-[190px] z-50 hidden my-4 list-none divide-y bg-white divide-gray-100 rounded-md shadow dark:bg-gray-700 dark:divide-gray-600',
              navConfig.addStyle.dropdownStyle
            )
          "
          id="user-dropdown"
        >
          <ul
            class="user-menu-links p-2 text-sm text-gray-800 divide-y divide-mercury-100"
            aria-labelledby="user-menu-button"
          >
            <router-link
              :to="userlink.link"
              v-for="(userlink, index) in userLinks"
              v-bind:key="index"
              class="user-menu-link"
            >
              <li
                class="flex flex-row items-center py-1.5 px-2 gap-2 rounded-xs text-sm hover:bg-black/10 border-b border-mercury-100"
              >
                <Icon
                  v-if="userlink.icon"
                  :icon="userlink.icon"
                  class="w-3 h-3"
                />
                <span>{{ userlink.label }}</span>
              </li>
            </router-link>
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="navlinks-container items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <slot name="navlinks"></slot>
        <!-- Para configurar navlinks:
          <ul
          class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
              aria-current="page"
              >Home</a
            >
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from "vue";
import { twMerge } from "tailwind-merge";
import { initFlowbite } from "flowbite";
import { Icon } from "@iconify/vue";
import EraAvatarFallbackInitials from "../Avatar/EraAvatarFallbackInitials.vue";
import { NavConfig, ButtonNavigation, UserDropdownLink } from "./constants";

defineProps({
  buttonsNavigation: {
    type: Array as PropType<Array<ButtonNavigation>>,
    default: () => <ButtonNavigation[]>[],
  },
  navConfig: {
    type: Object as PropType<NavConfig>,
    default: () => {
      return {
        logo: {
          route: "/",
          label: "",
          labelStyle: "",
        },
        profile: {
          photo:
            "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
          name: "Fernando Pessoa",
        },
        avatarStyle: {
          root: "",
          image: "",
          fallback: "",
        },
        addStyle: {
          navStyle: "",
          burguerStyle: "",
          buttonsStyle: "",
          dropdownStyle: "",
        },
      };
    },
  },
  userLinks: {
    type: Array<UserDropdownLink>,
    default: () => {
      return [
        {
          label: "",
          link: "/",
          icon: "",
        },
      ];
    },
  },
});

const isDropdownOpen = ref(false);

onMounted(() => {
  initFlowbite();
});
</script>

<style lang="scss" scoped>
.user-menu-link:last-child{
  border-color: transparent;
}
</style>
