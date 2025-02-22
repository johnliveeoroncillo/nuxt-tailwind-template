import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin(nuxtApp => {
  const pinia = createPinia();
  if (import.meta.client) {
    pinia.use(piniaPersist);
  }
  nuxtApp.vueApp.use(pinia);
});