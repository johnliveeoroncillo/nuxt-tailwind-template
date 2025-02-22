import { defineStore } from "pinia"

interface State {
}

export const useGlobalStore = defineStore('globalStore', {
    state: (): State => ({
    }),
    actions: {
    },
    persist: false, // Enable persistence for this store
})