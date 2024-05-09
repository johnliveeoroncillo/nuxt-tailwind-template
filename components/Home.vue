<template>
    <div class="h-screen w-screen grid place-items-center">
        <div>
            <h1>Test</h1>
            Will update this after 2 seconds data from store: {{ testData }}
            <custom-button-loader @click="openModal">Open Modal</custom-button-loader>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('LOAD_TEST');
    },
    methods: {
        openModal() {
            this.$modal.show('confirm', { message: 'Hi', yesText: 'Hello', data: this.testData, options: this.testData, callback: this.captureCallback });
        },
        captureCallback(options) {
            console.log('CAPTURED', options);
        }
    }
}
</script>