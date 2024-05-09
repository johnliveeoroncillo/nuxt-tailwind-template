<template>
    <span class="text-red-500 font-semibold block mt-1 error text-sm" v-if="error !== '' && error">{{error}}</span>
</template>

<script>
export default {
    props: ['error']
}
</script>