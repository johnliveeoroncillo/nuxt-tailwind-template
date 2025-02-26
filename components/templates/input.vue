<template>
    <div>
        <Label v-if="props.label" :for="id" class="mb-2 block">{{ props.label }}</Label>
        <Input
            :id="id"
            :type="type"
            required
            v-model="internalValue"
            class="w-full block"
            :class="{
                [props.class]: 1,
                'border-red-600 !ring-0': errorInput,
            }"
            :disabled="props.disabled"
        />
        <small class="text-red-600 font-medium text-xs" v-if="errorInput">{{ errorInput }}</small>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: false,
    },
    modelValue: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: 'text',
    },
    error: {
        type: String,
    },
    class: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false,
    }
});

// Local state for handling the value
const internalValue = ref(props.modelValue);
const errorInput = ref(props.error ?? '');

const emit = defineEmits(['update:modelValue']);

// **Watch internalValue and emit updates only if changed**
watch(internalValue, (newValue: any, oldValue: any) => {
    if (newValue !== oldValue) {
        errorInput.value = ''; // Reset error on input
        emit('update:modelValue', newValue);
    }
});

// **Watch error prop to keep in sync**
watch(() => props.error, (newValue: any) => {
    errorInput.value = newValue ?? '';
});
</script>