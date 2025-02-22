<template>
    <Button type="button" class="w-full rounded-full" :disabled="typeof isLoading === 'boolean' ? isLoading : disabled" :class="{'!pointer-events-none': isLoading}" @click="callback">
        <div v-if="isLoading" class="w-min">
            <LoaderCircle class="animate-spin" />
        </div>
        <slot />
    </Button>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance, nextTick } from "vue";
import { LoaderCircle } from 'lucide-vue-next';

const emit = defineEmits(['click']);
const props = defineProps(['loading', 'disabled'])

const isLoading = ref<boolean | null>(null);

// OVERRIDE LOADING
if (typeof props.loading === 'boolean') {
    isLoading.value = props.loading;
}

const instance = getCurrentInstance();
const callback = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    
    await nextTick();
    try {
        const click = instance.vnode.props?.onClick;
        if (click) {
            await click();
        }
    } catch (error) {
        console.error("Button action failed", error);
    } finally {
        isLoading.value = null;
    }
}
</script>