<template>
    <div class="flex-1 grid place-items-center h-full">
        <div class="text-gray-400">
            <h1 class="text-8xl text-red-500 font-bold">{{ error.statusCode }}</h1>
            <p v-if="error.statusCode === 404">
                Opps! PAGE NOT BE FOUND
                <br>
                Sorry but the page you are looking for does not exist, have been<br> removed, name changed or is temporarily unavailable.
            </p>
            <p v-else>{{ error.message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'blank' // you can set a custom layout for the error page
}
</script>