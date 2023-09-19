<template>
    <div class="relative">
        <input :type="type || 'text'" :class="state.inputStyle" placeholder=" " v-model="value" />
        <label for="floating_outlined" :class="state.labelStyle">
            {{ label }}
        </label>
    </div>

    <p class="mt-2 text-xs text-red-600 dark:text-red-400" v-if="!state.isValid">
        <span class="font-medium">
            Ooops!
        </span>
        {{ type == "password" ? 'Senha inválida!' : 'Validação do campo falhou!' }}
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
    rules: Array<ValidationRuleFunc>,
}>()

const labelStateStyle = {
    normalState: "absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
    errorState: "text-red-600 dark:text-red-500 peer-placeholder-shown:scale-100 peer-focus:text-red-600"
} as inputState

const inputStateStyle = {
    normalState: "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-gray-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer",
    errorState: "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none dark:text-white dark:border-red-500 border-red-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
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

