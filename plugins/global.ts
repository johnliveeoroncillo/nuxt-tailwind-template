import { useAuth } from "@/composables/useAuth";

export default defineNuxtPlugin(nuxtApp => {
    // Define the global mixin
    nuxtApp.vueApp.mixin({
        computed: {
            USER() {
                return useAuth().user;
            }
        },
        methods: {
            logout() {
                useAuth().clearAuth();
                return this.$router.replace('/');
            }
        }
    });
});