<template>
    <div>
        <label v-if="label" :for="label" class="block text-blueGray-700 font-bold mb-2">{{label}}</label>
        <label v-else-if="label_small" :for="label_small" class="block text-blueGray-700 font-semibold uppercase !mb-1 text-xs">{{label_small}}</label>
        <label class="inline-flex items-center cursor-pointer !mb-0 !pb-0">
            <input type="checkbox" value="" class="sr-only peer" v-model="localValue" :disabled="disabled" :readonly="readonly">
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm font-medium text-gray-900" v-if="cb_label"> {{ cb_label }}</span>
        </label>
        <error :error="errorInput" />
    </div>
</template>

<script>
export default {
    props: ['value', 'label', 'error', 'required', 'placeholder', 'disabled', 'readonly', 'classes', 'refs', 'label_small', 'cb_label'],
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