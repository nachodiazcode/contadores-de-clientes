<script setup lang="ts">
import { useStore } from 'vuex' // 👈 importante: Vuex!
import { computed } from 'vue'

const store = useStore()

// Opciones para el select
const opcionesOrden = [
  { value: 'nombre-asc', label: 'Nombre ↑' },
  { value: 'nombre-desc', label: 'Nombre ↓' },
  { value: 'visitas-asc', label: 'Visitas ↑' },
  { value: 'visitas-desc', label: 'Visitas ↓' },
] as const

// Computed setters/getters (v-model necesita acceso reactivo)
const orden = computed({
  get: () => store.state.orden,
  set: (value) => store.commit('SET_ORDEN', value),
})

const soloActivos = computed({
  get: () => store.state.soloActivos,
  set: (value) => store.commit('SET_SOLO_ACTIVOS', value),
})

const texto = computed({
  get: () => store.state.texto,
  set: (value) => store.commit('SET_TEXTO', value),
})
</script>

<template>
  <div class="controls">
    <select v-model="orden">
      <option v-for="o in opcionesOrden" :key="o.value" :value="o.value">
        {{ o.label }}
      </option>
    </select>

    <label style="margin-left:8px">
      <input v-model="soloActivos" type="checkbox">
      Activos
    </label>

    <input v-model="texto" type="search" placeholder="Buscar por nombre…" style="margin-left:8px">

    <button v-if="texto || soloActivos" style="margin-left:8px" @click="texto = ''; soloActivos = false">
      Limpiar
    </button>
  </div>
</template>
