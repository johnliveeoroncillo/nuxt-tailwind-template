<template>
    <div class="h-screen w-screen grid place-items-center">
        <div>
            <h1>Test</h1>
            Will update this after 2 seconds data from store: {{ testData }}
            <custom-button-loader @click="openModal">Open Modal</custom-button-loader>

            <custom-input :label="`Firstname - ${data.firstname}`" v-model="data.firstname" placeholder="Test" />
            <custom-input label="Error" v-model="data.test" :error="errorInput.test" />
            <custom-button-loader class="mt-2" @click="login">Login</custom-button-loader>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: {},
        }
    },
    mounted() {
        this.$store.dispatch('LOAD_TEST');
    },
    methods: {
        openModal() {
            this.$modal.show('confirm', { message: 'Hi', yesText: 'Hello', noText: 'No', data: this.testData, options: this.testData, callback: this.captureCallback });
        },
        captureCallback(options) {
            console.log('CAPTURED', options);
            this.$modal.hide('confirm');
        },
        async login() {
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    return resolve();
                }, 1000);
            });

            await promise;
            // for text validations
            this.parseError({
                errors: {
                    test: 'Test error',
                }
            })
            // for toast error
            this.parseError({
                message: 'Error test',
            })
        }
    }
}
</script>