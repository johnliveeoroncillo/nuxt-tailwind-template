<template>
    <transition name="fade">
        <component :is="`modal-layouts-${data ? data.layout : ''}`" v-if="data && data.layout && show"></component>
    </transition>
</template>

<script>
export default {
    modal: 'modal',
    data() {
        return {
            show: false,
            data: {},
        }
    }
}
</script>