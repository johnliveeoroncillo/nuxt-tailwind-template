<template>
    <div class="h-screen w-screen grid place-items-center">
        <div>
            <h1>Test</h1>
            Will update this after 2 seconds data from store: {{ testData }}
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$store.dispatch('LOAD_TEST');
    }
}
</script>