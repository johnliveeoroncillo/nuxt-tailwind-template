<template>
    <button class="jl-button" :class="{'bg-blue-600 rounded-lg py-2.5 font-semibold px-4 text-white hover:bg-blue-800': 1, 'loading':loading || loading_stock}" :disabled="loading || loading_stock" @click="callback">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            loading_stock: false
        }
    },
    methods: {
        async callback() {
            if(!this.$listeners?.click) return;
            this.loading_stock = true;
            await this.$listeners.click();
            this.loading_stock = false;
        }
    }
}
</script>

<style scoped>
    .jl-button {
        position: relative;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .jl-button[disabled] {
        cursor: not-allowed;
        background-color: #d5d5d5;
    }
    .jl-button.loading::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        background-color: inherit;
        bottom: 0;
        border-radius: inherit;
    }
    .jl-button.loading::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 3px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
    }
    @keyframes button-loading-spinner {
        from {
            transform: rotate(0turn);
        }
        to {
            transform: rotate(1turn);
        }
    }
</style>