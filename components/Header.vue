<script setup lang="ts">
import { useStore } from 'vuex'

const store = useStore()

defineOptions({
  name: 'HeaderBar' // ✔️ evita el error de nombre de componente single-word
})
</script>

<template>
  <header
    style="padding:12px; border-bottom:1px solid #e5e7eb; display:flex; justify-content:space-between; align-items:center"
  >
    <strong>Contadores</strong>

    <button @click="store.commit('setModal', true)">
      Agregar
    </button>
  </header>
</template>
