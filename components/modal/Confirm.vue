<template>
    <transition name="fade">
        <div tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[200] w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-50 grid place-items-center" v-if="show">
            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow ">
                    <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center -800 " data-modal-toggle="popup-modal" @click="close">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                    </button>
                    <div class="p-6 text-left !pt-10">
                        <!-- <svg class="mx-auto mb-4 w-14 h-14 text-green-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> -->
                        <h3 class="mb-8 text-lg !font-bold text-gray-700">{{data.message || "Are you sure you want to delete this data?"}}</h3>
                        <div class="text-right">
                            <custom-button-loader data-modal-toggle="popup-modal" type="button" class="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg inline-flex items-center px-6 py-2 text-center mr-2" @click="callback" id="confirm_yes">
                                {{ data.yesText || 'Yes' }}
                            </custom-button-loader>
                            <custom-button-loader data-modal-toggle="popup-modal" type="button" class="bg-gray-200 !text-blueGray-600 hover:bg-gray-300 rounded-lg border border-gray-200 font-medium px-6 py-2 hover:text-gray-900 focus:z-10" @click="close" id="confirm_close">{{ data.noText || 'No' }}</custom-button-loader>
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
            modal: 'confirm',
            show: false,
            data: {}
        }
    },
    mounted() {
        this.$modal.on(`show_${this.modal}`, this.showModal);
        this.$modal.on(`hide_${this.modal}`, this.close);
    },
    beforeDestroy() {
        this.$modal.off(`show_${this.modal}`, this.showModal);
        this.$modal.off(`hide_${this.modal}`, this.close);
    },
    methods: {
        async callback() {
            if(typeof this.data.callback === 'function') {
                const options = this.data?.options ?? {};
                await this.data.callback(options);
                this.close();
            }
        },
        showModal(data) {
            this.show = true;
            this.data = Object.assign({}, this.data, data);
        },
        close() {
            this.show = false;
            this.data = {};
        },
    },
}
</script>