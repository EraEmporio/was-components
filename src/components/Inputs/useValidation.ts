import { computed, ref, watch } from 'vue';
import { ValidationRuleFunc, validateRules } from '../../utils/validation';
import { twMerge } from 'tailwind-merge'
import { inputState } from './constants';


export default function useValidation(modelValue: any, rules: Array<ValidationRuleFunc>, labelStateStyle: inputState, inputStateStyle: inputState) {

    const validInput = ref(true)
    
    console.log("start validation", modelValue)
    const validInputStyle = (normal: string, error: string) => {
        return validInput.value ? normal : twMerge(normal, error);
    }

    const labelStyle = computed(() => {
        const { normalState, errorState } = labelStateStyle;
        return validInputStyle(normalState, errorState);
    });

    const inputStyle = computed(() => {
        const { normalState, errorState } = inputStateStyle;
        return validInputStyle(normalState, errorState);
    });

    watch(() => modelValue.value, (newValue) => {
        console.log(newValue)
        validInput.value = validateRules(newValue, rules)
    });


    return { inputStyle, labelStyle, isValid: validInput }
}