<template>
  <nav
    :class="
      twMerge(
        'user-navbar--root bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200',
        styling.root
      )
    "
  >
    <div
      :class="
        twMerge(
          'user-navbar--container w-full max-w-screen-3xl inline-flex flex-wrap items-center justify-between mx-auto px-4 md:px-10 py-4',
          styling.container
        )
      "
    >
      <a
        :href="params.logo.route"
        :alt="params.logo.label"
        :class="
          twMerge(
            'user-navbar--logo-container flex items-center space-x-3 rtl:space-x-reverse',
            styling.logo.container
          )
        "
      >
        <slot name="logo">
          <Icon icon="ph:x-square-thin" height="30px" width="30px" />
        </slot>

        <span
          :class="
            twMerge(
              'user-navbar-logo--label self-center text-2xl font-semibold whitespace-nowrap',
              styling.logo.label
            )
          "
          >{{ params.logo.label }}</span
        >
      </a>
      <div
        :class="
          twMerge(
            'user-navbar--content-container flex items-center md:order-2 space-x-1 md:space-x-0',
            styling.content
          )
        "
      >
        <div class="extra-container flex items-center space-x-1 md:space-x-0">
          <slot name="extra"></slot>
        </div>
        <era-user-dropdown
          :id="id + '-dropdown'"
          :profile="params.profile"
          :dropdownLinks="userLinks"
          :styling="styling.dropdown"
        />
        <button
          type="button"
          :data-collapse-toggle="id"
          :aria-controls="id"
          aria-expanded="false"
          :class="twMerge('user-navbar--navlinks-hamburger inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600', styling.hamburger)"
        >
          <span class="sr-only">Open main menu</span>
          <Icon
            icon="quill:hamburger"
            class="w-5 h-auto"
          />
        </button>
      </div>
      <div
        class="user-navbar-navlinks--container items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        :id="id"
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
import { onMounted, PropType } from "vue";
import { twMerge } from "tailwind-merge";
import { initFlowbite } from "flowbite";
import { Icon } from "@iconify/vue";
import EraUserDropdown from "../Dropdowns/EraUserDropdown.vue";
import { NavParams, UserDropdownLink } from "./constants";

type Styling = {
  root: string;
  container: string;
  logo: {
    container: string;
    label: string;
  };
  content: string;
  hamburger: string;
  dropdown: {
    button: string;
    dropdown: string;
    avatar: {
      root: string;
      image: string;
      fallback: string;
    };
    links: {
      root: string;
      icon: string;
      route: string;
    };
  };
};

defineProps({
  id: {
    type: String,
    default: "era-user-navbar",
  },
  params: {
    type: Object as PropType<NavParams>,
    default: () => {
      return {
        logo: {
          route: "/",
          label: "",
        },
        profile: {
          photo:
            "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
          name: "Fernando Pessoa",
        }
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
  styling: {
    type: Object as PropType<Styling>,
    default: () => {
      return {
        root: "",
        container: "",
        logo: {
          container: "",
          label: "",
        },
        content: "",
        hamburger: "",
        dropdown: {
          button: "",
          avatar: {
            root: "",
            image: "",
            fallback: "",
          },
          dropdown: "",
          links: {
            root: "",
            icon: "",
            route: "",
          },
        },
      };
    },
  }
});

onMounted(() => {
  initFlowbite();
});
</script>
