<template>
    <div>
        <label v-if="label" :for="label" class="block text-blueGray-700 font-bold mb-2">{{label}}</label>
        <label v-else-if="label_small" :for="label_small" class="block text-blueGray-700 font-semibold uppercase !mb-1 text-xs">{{label_small}}</label>
        <select :id="label" :ref="refs" v-model="localValue" class="h-[37px] border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 font-semibold text-blueGray-800 block w-full" :class="{'!border !border-red-500' : errorInput, [classes]: true}" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" v-on="listeners">
            <option :value="undefined" v-if="placeholder" disabled selected="selected">{{ placeholder }}</option>
            <slot />
        </select>
        <error :error="errorInput" />
    </div>
</template>

<script>
export default {
    props: ['value', 'label', 'error', 'required', 'placeholder', 'disabled', 'readonly', 'classes', 'refs', 'label_small'],
    data() {
        return {
            errorInput: '',
        }
    },
    computed: {
        listeners() {
            const listeners = this.$listeners // exclude `click`-listener
            delete listeners.input;

            return listeners
        },
        localValue: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('input', value);
                this.errorInput = '';
            }
        }
    },
    watch: {
        error(n) {
            this.errorInput = n;
        },
    },
}
</script>