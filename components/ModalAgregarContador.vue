<script setup lang="ts">
import { useContadores } from './../stores/contadores'   // <- import explícito

const store = useContadores()
const nombre = ref('')
function agregar() {
  const n = nombre.value.trim()
  if (!n) return
  store.add(n)
  nombre.value = ''
  store.modalAbierto = false
}
</script>

<template>
  <div v-if="store.modalAbierto" style="position:fixed;inset:0;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;z-index:50">
    <div style="background:white;padding:16px;border-radius:12px;min-width:320px">
      <h3 style="margin:0 0 12px 0">Agregar contador</h3>
      <input v-model="nombre" placeholder="Nombre del local" style="width:100%;margin-bottom:12px" />
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button @click="store.modalAbierto=false">Cancelar</button>
        <button @click="agregar">Agregar</button>
      </div>
    </div>
  </div>
</template>
