<template>
    <div>
        <label for="first_name" :class="state.labelStyle">{{ label }}</label>
        <input :type="type || 'text'" id="first_name" :class="state.inputStyle" :placeholder="placeholder" v-model="value">
    </div>

    <p class="mt-2 text-xs text-red-600 dark:text-red-500" v-if="!state.isValid">
        <span class="font-medium">
            Ooops!
        </span>
        {{ 'Validação do campo falhou!' }}
    </p>
</template>

<script lang="ts" setup>
import { reactive, toRef, computed } from 'vue';
import { ValidationRuleFunc } from '../../utils/validation';
import { inputState } from './constants';
import useValidation from './useValidation';

const props = defineProps<{
    modelValue: string,
    label: string,
    type: string,
    placeholder: string;
    rules: Array<ValidationRuleFunc>,
}>()

const labelStateStyle = {
    normalState: "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    errorState: "text-red-700 dark:text-red-500"
} as inputState

const inputStateStyle = {
    normalState: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    errorState: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
} as inputState

const emit = defineEmits(['update:modelValue'])
const state = reactive(
    useValidation(
        toRef(props, 'modelValue'),
        props.rules, labelStateStyle, inputStateStyle
    )
)

const value = computed<string>({
    get() {
        return props.modelValue
    },
    set(newValue: string) {
        emit('update:modelValue', newValue)
    }
})

</script>

