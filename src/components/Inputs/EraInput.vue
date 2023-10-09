<script setup lang="ts">
import { toRef, computed } from 'vue';
import { useField } from 'vee-validate';
import {
    FloatingInputStyle,
    FloatingLabelStyle,
    RegularInputStyle,
    RegularLabelStyle,
    inputState
} from './constants';
import validInputStyle from './useVariation';
import InputErrorMessage from './InputErrorMessage.vue';
import InputSuccessMessage from './InputSuccessMessage.vue';

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    variation: {
        type: String,
        default: 'regular'
    },
    value: {
        type: String,
        default: undefined,
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    validateSuccess: {
        type: Boolean,
        default: false,
    },
    successMessage: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});

const variations = {
    'regular': {
        input: RegularInputStyle,
        label: RegularLabelStyle
    },
    'floating': {
        input: FloatingInputStyle,
        label: FloatingLabelStyle
    }
} as { [key: string]: { input: inputState, label: inputState } }

const labelStateStyle = variations[props.variation].label;
const inputStateStyle = variations[props.variation].input;

const labelStyle = computed(() => {
    const { valid, dirty } = meta;
    return validInputStyle(labelStateStyle, valid, dirty, props.validateSuccess);
});

const inputStyle = computed(() => {
    const { valid, dirty } = meta;
    const { validateSuccess, disabled } = props;
    return validInputStyle(inputStateStyle, valid, dirty, validateSuccess, disabled);
});

const showSuccessMessage = computed(() => {
    if(props.disabled) return false;
    return meta.valid && props.validateSuccess && meta.dirty
})

const showErrorMessage = computed(() => {
    if(props.disabled) return false;
    return !meta.valid && meta.dirty
})
</script>

<template>
    <div class="relative">
        <label :for="name" :class="labelStyle">{{ label }}</label>
        <input :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder" :class="inputStyle"
            @input="handleChange" @blur="handleBlur" :disabled="disabled" />

        <input-success-message :enable="showSuccessMessage" :message="successMessage" />
        <input-error-message :enable="showErrorMessage" :message="errorMessage" />
    </div>
</template>