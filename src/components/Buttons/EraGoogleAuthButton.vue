<template>
    <button
                 :class="twMerge('flex items-center w-full h-[50px] px-6 bg-mercury-50 rounded-lg font-medium shadow focus:bg-mercury-100 ', styling)"
                 
               >
               <Icon :icon="icon" class="w-5 h-auto"/>
                 <span class="grow">{{ label }}</span>
               </button>
   </template>
   
   <script setup lang="ts">
   import { twMerge } from 'tailwind-merge';
   import { Icon } from '@iconify/vue';
   
   defineProps({
       icon: {
           type: String,
           default: 'devicon:google'
       },
       styling: {
           type: String,
           default: ''
       },
       label: {
           type: String,
           default: 'Continuar com Google'
       }
   
   })
   </script>