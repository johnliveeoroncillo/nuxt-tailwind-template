<template>
    <transition name="fade">
        <div tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50 grid place-items-center" v-if="show">
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="authentication-modal" @click="close">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                    <div class="py-6 px-6 lg:px-8">
                        <h3 class="mb-4 text-2xl font-bold text-gray-800">POS Configuration</h3>
                        <div class="space-y-2">
                            <div>
                                <label>Premise Server/IP Domain</label>
                                <custom-input placeholder="XXX.XXX.XX.XX" />
                            </div>

                            <div>
                                <label>Cloud Server/IP Domain</label>
                                <custom-input placeholder="XXX.XXX.XX.XX" />
                            </div>

                            <div>
                                <label>Terminal Name</label>
                                <custom-input />
                            </div>


                            <button-loader :disabled="success === true" class="w-full text-white bg-gray-800 hover:bg-gray-600 font-medium rounded-lg px-6 py-3 text-center" @click="data.server = 'http://localhost:6060'; testConfig(data.server)">Use Local</button-loader>

                            <button-loader :disabled="success === true" class="w-full text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg px-6 py-3 text-center" @click="testConfig(data.server)">Test Config</button-loader>

                            <button class="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-6 py-3 text-center" @click="saveConfig">Save Configuration</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
export default {
    data() {
        return {
            modal: 'configure-modal',
            show: false,
            data: {},
            success: '',
        }
    },
    watch: {
        "data.server"() {
            this.success = '';
        }
    },
    created() {
        this.$modal.on(`show_${this.modal}`, this.showModal);
        
        this.$root.$on('server_response', (payload) => {
            this.data.server = payload.server;
            this.success = payload.response;
        });
    },
    beforeDestroy() {
        this.$modal.off(`show_${this.modal}`, this.showModal)
        this.$root.$off('server_response')
    },
    methods: {
        saveConfig() {
            localStorage.setItem('pos-server', this.data.server);
            window.location.reload(true);
        },
        showModal() {
            this.show = true;
            this.data = Object.assign({}, this.data, {
                server: this.server,
            });
        },
        close() {
            this.show = false;
            this.data = {};
        },
    },
}
</script>