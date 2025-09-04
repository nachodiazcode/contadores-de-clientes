// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'


export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint'],
  devtools: { enabled: true },
  app: { head: { title: 'Contadores de Clientes' } }
})
