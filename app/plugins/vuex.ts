import { defineNuxtPlugin } from 'nuxt/app' // ✔️ Nuxt 4 oficial
import store from './../../stores/contadores'      // ✔️ tu store Vuex

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
})
