<script setup lang="ts">
// Store
import { useContadores } from './../../stores/contadores'


// Componentes
import Header from './../../components/Header.vue'
import Footer from './../../components/Footer.vue'
import OrdenarContadores from './../../components/OrdenarContadores.vue'
import FiltrarContadores from './../../components/FiltrarContadores.vue'
import ListadorDeContadores from './../../components/ListadorDeContadores.vue'
import SumaDeContadores from './../../components/SumaDeContadores.vue'
import ModalAgregarContador from './../../components/ModalAgregarContador.vue'

// Estado local
const store = useContadores()
const modal = ref(false)
const nombre = ref('')

const canSave = computed(() => {
  const n = nombre.value.trim()
  return n.length > 0 && n.length <= 20 && !store.isFull
})

function save() {
  if (!canSave.value) return
  store.add(nombre.value)
  nombre.value = ''
  modal.value = false
}
</script>

<template>
  <NuxtLayout>
    <template #top><Header /></template>

    <section class="controls">
      <OrdenarContadores />
      <FiltrarContadores />
      <button class="btn" @click="modal = true">+ Nuevo</button>
    </section>

    <ListadorDeContadores />

    <SumaDeContadores />
    <Footer />

    <ModalAgregarContador v-if="modal" @close="modal = false" @save="save" />
  </NuxtLayout>
</template>

<style scoped>
.controls { display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin:12px 0; }
.btn { padding:8px 14px; border-radius:8px; border:1px solid #555; }
</style>
