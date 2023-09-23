

<template>
    <Form v-slot="{ handleSubmit }" as="div">
        <form @submit="handleSubmit($event, onSubmit)">
            <template
                v-for="{ name, label, type, children, placeholder, validateSuccess, successMessage, disabled, ...attrs } in schema.fields"
                :key="name">
                <Field :id="name" :name="name" v-bind="attrs" v-slot="{ field }">
                    <EraInput :type="type" :label="label" :placeholder="placeholder" :validateSuccess="validateSuccess"
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

defineProps<{
    schema: {
        fields: Array<{
            as: string,
            name: string,
            label: string,
            type: string,
            children: Array<{ tag: string, text: string, childAttrs: Object }>
            attrs: Object,
            placeholder: string,
            validateSuccess: boolean,
            successMessage: string | undefined,
            disabled: boolean | undefined
        }>
    }
}>()


const onSubmit = (values: any) => {
    console.log(JSON.stringify(values, null, 2));
}
</script>
