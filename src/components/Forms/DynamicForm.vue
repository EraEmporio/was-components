

<template>
    <Form v-slot="{ handleSubmit }" as="div">
        <form @submit="handleSubmit($event, onSubmit)">
            <template
                v-for="{ name, label, type, children, placeholder, variation, validateSuccess, successMessage, disabled, ...attrs } in schema.fields"
                :key="name">
                <Field :id="name" :name="name" v-bind="attrs" v-slot="{ field }">
                    <EraInput :type="type" :label="label" :placeholder="placeholder" :validateSuccess="validateSuccess"
                    :variation="variation"
                        :disabled="disabled" :success-message="successMessage" v-bind="field" />

                    <template v-if="children && children.length">
                        <component v-for="({ tag, text, ...childAttrs }, idx) in children" :key="idx" :is="tag"
                            v-bind="childAttrs">
                            {{ text }}
                        </component>
                    </template>
                </Field>
            </template>
            <button class="btn-primary">Submit</button>
        </form>
    </Form>
</template>
  
<script lang="ts" setup>
import { Form, Field } from 'vee-validate';
import { Schema } from './constants';

defineProps<{
    schema: Schema
}>()

type ValueOfFieldSchema = { [key: string]: string };
// const emit = defineEmits(['submittedForm'])

const onSubmit = (values: ValueOfFieldSchema) => {
    console.log('aaaa', values)
    /* emit('submittedForm', values) */
}
/* 
import { useSubmitForm } from 'vee-validate';
const submitForm = async () => {
    console.log("helou?", useSubmitForm, veeForm)
    const submit = useSubmitForm((values, actions) => {
        // Send data to your api ...
        console.log("submitformmmm", values);
        // You can perform any of the form actions using the actions object
        // set a single field value

        // reset the form
        actions.resetForm();
    });

    submit();


}

defineExpose({
    submitForm,
}) */
</script>
