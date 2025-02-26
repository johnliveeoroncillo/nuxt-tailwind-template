import { defineStore } from "pinia"

interface State {
    socketId: string;
}

export const useGlobalStore = defineStore('globalStore', {
    state: (): State => ({
        socketId: '',
    }),
    actions: {
    },
    persist: false, // Enable persistence for this store
})