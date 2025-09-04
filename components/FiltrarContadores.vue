<script setup lang="ts">
import { useContadores } from './../stores/contadores'
const store = useContadores()

const opcionesOrden = [
  { value: 'nombre-asc',  label: 'Nombre ↑' },
  { value: 'nombre-desc', label: 'Nombre ↓' },
  { value: 'visitas-asc', label: 'Visitas ↑' },
  { value: 'visitas-desc',label: 'Visitas ↓' },
] as const
</script>

<template>
  <div class="controls">
    <select v-model="store.orden">
      <option v-for="o in opcionesOrden" :key="o.value" :value="o.value">
        {{ o.label }}
      </option>
    </select>

    <label style="margin-left:8px">
      <input type="checkbox" v-model="store.soloActivos" />
      Activos
    </label>

    <input
        type="search"
        v-model="store.texto"
        placeholder="Buscar por nombre…"
        style="margin-left:8px"
    />

    <button
        v-if="store.texto || store.soloActivos"
        @click="store.texto=''; store.soloActivos=false"
        style="margin-left:8px"
    >
      Limpiar
    </button>
  </div>
</template>
