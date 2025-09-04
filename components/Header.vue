<script setup lang="ts">
const store = useContadores()
</script>

<template>
  <header style="padding:12px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center">
    <strong>Contadores</strong>
    <button @click="store.modalAbierto = true">Agregar</button>
  </header>
</template>
