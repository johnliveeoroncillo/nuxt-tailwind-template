<template>
    <slot />
    <Toaster />
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { socket } from '@/components/socket';
onMounted(() => {
    socket.connect();
})
</script>