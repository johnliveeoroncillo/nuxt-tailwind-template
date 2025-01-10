import Vue from 'vue';
import ModalComponent from "../components/modal/index.vue";

const modals = {}
export default (context, inject) => {
    const bus = new Vue()
    inject("modal", {
        show(modal, options = {}) {
            const keys = Object.keys(modals).length;
            const count = keys + 1;

            // const modalName = `${modal}${count > 1 ? `-${count}` : ''}`;
            const modalName = options.component;

            if (!modals[modalName]) {
                ModalComponent.modal = modalName;
                ModalComponent.$modal = this;
            
                const newModal = new Vue({
                    ...context,
                    ...ModalComponent,
                    template: ModalComponent.$el,
                    methods: {
                        async callback() {
                            if(typeof this.data.callback === 'function') {
                                const options = this.data?.options ?? {};
                                await this.data.callback(options);

                                if (!this.data.preventClose) {
                                    this.close();
                                }
                            }
                        },
                        showModal(data) {
                            this.show = true;
                            console.log(data, this.data, this.$options.modal);
                            this.data = Object.assign({}, this.data, data);
                            if (!data.layout) {
                                this.data = Object.assign({}, this.data, { layout: 'default' });
                            }
                        },
                        close() {
                            this.show = false;
                            this.data = {};
                        },
                    },
                    created() {
                        console.log(modalName)
                        this.$modal.on(`show_${modalName}`, this.showModal);
                        this.$modal.on(`hide_${modalName}`, this.close);
                    },
                    beforeDestroy() {
                        this.$modal.off(`show_${modal}`, this.showModal);
                        this.$modal.off(`hide_${modal}`, this.close);
                        delete modals[modalName];
                    }
                });

                modals[modalName] = newModal;
            }
            
            const element = document.createElement('div');
            element.setAttribute('id', modalName);
            document.querySelector('#__layout').appendChild(element);
            modals[modalName].$mount(`#${modalName}`)
            
            bus.$emit(`show_${modalName}`, options);
        },
        hide(modal, options = {}) {
            console.log(modal)
            bus.$emit(`hide_${modal}`, options)
        },
        on(event, callback) {
            bus.$on(event, (data) => {
                callback.call(this, data);
            });
        },
        off(event) {
            bus.$off(event);
        }
    });
}
