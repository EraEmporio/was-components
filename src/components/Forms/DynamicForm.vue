

<template>
    <Form v-slot="{ handleSubmit, resetForm }" @submit="onSubmit" id="zodForm">
        <form :id="formId" @submit="handleSubmit($event, onSubmit); resetFormAfterSubmit ? resetForm() : null">
            <div class="grid grid-cols-10 gap-6">
                <template
                    v-for="{ name, label, variation, type, children, options, placeholder, validateSuccess, successMessage, size, disabled, colPlacement, inputType, as, config, ...attrs } in schema.fields"
                    :key="name">
                    <div :class="colPlacement">
                        <Field :validate-on-input="false" :id="name" :name="name" v-bind="attrs" v-slot="{ field }">
                            <EraInput v-if="as !== 'select'" :type="type" :label="label" :placeholder="placeholder"
                                :validateSuccess="validateSuccess" :disabled="disabled" :success-message="successMessage"
                                :variation="variation" v-bind="field" :inputType="inputType" :size="size" />
                            <EraSelect v-if="as == 'select'" :type="type" :label="label" :placeholder="placeholder"
                                :validateSuccess="validateSuccess" :disabled="disabled" :success-message="successMessage"
                                :variation="variation" v-bind="field" :inputType="inputType" :options="options" :size="size" :config="config" />

                            <template v-if="children && children.length">
                                <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag"
                                    v-bind="childAttrs">
                                    {{ text }}
                                </component>
                            </template>
                        </Field>
                    </div>
                </template>
            </div>
        </form>
    </Form>
</template>
  
<script lang="ts" setup>
import { Form, Field, configure } from 'vee-validate';
import { Schema } from './constants';
import { EraSelect } from '..';

defineProps<{
    formId: string,
    schema: Schema,
    validationSchema: Object,
    resetFormAfterSubmit: boolean,
}>()

type ValueOfFieldSchema = { [key: string]: string };

configure({
    validateOnInput: false, 
});

const emits = defineEmits(["submittedForm"])
const onSubmit = (values: ValueOfFieldSchema) => {
    emits("submittedForm", values);
}




</script>
