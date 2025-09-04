<!-- components/OrdenarContadores.vue -->
<script setup lang="ts">
import { useContadores } from './../stores/contadores'   // <- import explícito
const store = useContadores()                         // <- INICIALÍZALO
</script>

<template>
  <div class="controls">
    <select v-model="store.orden">
      <option value="nombre-asc">Nombre ↑</option>
      <option value="nombre-desc">Nombre ↓</option>
      <option value="visitas-asc">Visitas ↑</option>
      <option value="visitas-desc">Visitas ↓</option>
    </select>
  </div>
</template>
