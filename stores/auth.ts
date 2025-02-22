import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null as any,
    }),
    actions: {
        setUser(userData: any) {
            this.user = userData;
        },
    },
    persist: true, // Enable persistence for this store
})
