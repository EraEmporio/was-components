<template>
  <div
    class="layout-container h-screen grid grid-cols-12 grid-flow-col gap-0.5"
  >
    <div
      :class="
        twMerge(
          'side-container col-span-3 h-full flex flex-col py-24 bg-gray-700',
          layoutConfig.addStyle.side
        )
      "
    >
      <div class="img-container grow flex items-start justify-center">
        <slot name="logo"></slot>
      </div>
      <div
        :class="
          twMerge(
            'links-container flex justify-end items-center px-12',
            layoutConfig.addStyle.sideMenu
          )
        "
      >
        <ul class="flex flex-col list-none gap-1.5">
          <li
            v-for="(sidelink, index) in sideLinks"
            v-bind:key="index"
            :class="
              twMerge(
                'text-right text-white hover:opacity-70',
                layoutConfig.addStyle.sideLink
              )
            "
          >
            <a :href="sidelink.link">{{ sidelink.label }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="main-container col-span-9 h-full flex items-center justify-center"
    >
      <div
        :class="
          twMerge(
            'login-container w-[48%] h-[70%] flex-col justify-center items-center py-12 gap-8 rounded-[20px] border border-gray-200',
            layoutConfig.addStyle.login
          )
        "
      >
        <div
          class="icon-container flex flex-col gap-4 justify-center items-center"
        >
          <slot name="icon"></slot>
          <second-title
            :title="layoutConfig.login.title"
            :addStyle="layoutConfig.addStyle.loginTitle"
          />
        </div>
        <div class="input-container">
            <slot name="form"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { twMerge } from "tailwind-merge";
import * as config from "./constants";
import { SecondTitle } from "../Titles";

defineProps({
  layoutConfig: {
    type: Object as PropType<config.Config>,
    default: () => {
      return {
        addStyle: {
          side: "",
          sideMenu: "",
          sideLink: "",
          login: "",
          loginTitle: "",
        },
        login: {
          title: "Acesse sua conta",
        },
      };
    },
  },
  sideLinks: {
    type: Array<config.SideLink>,
    default: () => {
      return [
        {
          label: "",
          link: "/",
        },
      ];
    },
  },
});
</script>
