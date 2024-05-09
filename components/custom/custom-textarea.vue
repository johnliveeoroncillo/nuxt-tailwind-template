<template>
    <div>
        <label v-if="label" :for="label" class="block text-blueGray-700 font-bold mb-2">{{label}}</label>
        <label v-else-if="label_small" :for="label_small" class="block text-blueGray-700 font-semibold uppercase !mb-1 text-xs">{{label_small}}</label>
        <textarea :id="label" :ref="refs" v-model="localValue" :type="type ? type : 'text'" class="border border-gray-300 px-4 py-2 rounded-lg focus:border-blue-600 font-semibold text-blueGray-800 block w-full placeholder:text-gray-300" :class="{'!border !border-red-500' : errorInput, [classes]: true, 'resize-none': noresize}" :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :data-barcode="data_barcode" v-on="listeners" :rows="rows"></textarea>
        <custom-error :error="errorInput" />
    </div>
</template>

<script>
export default {
    props: ['value', 'label', 'error', 'required', 'type', 'placeholder', 'disabled', 'readonly', 'classes', 'refs', 'data_barcode', 'label_small', 'rows', 'noresize'],
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