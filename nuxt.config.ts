// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'


// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/eslint'],
  devtools: { enabled: true },
  app: { head: { title: 'Contadores de Clientes' } }
})
