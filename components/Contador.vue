<script setup lang="ts">
import type { Contador as C } from './../stores/contadores'

const store = useContadores()
const props = defineProps<{ contador: C }>()
</script>

<template>
  <div style="border:1px solid #e5e7eb;border-radius:12px;padding:12px;display:grid;gap:8px">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <strong>{{ props.contador.nombre }}</strong>
      <label style="display:flex;align-items:center;gap:6px">
        <input type="checkbox" :checked="props.contador.activo" @change="store.toggle(props.contador.id)" />
        Activo
      </label>
    </div>
    <p style="font-size:32px;font-weight:900;margin:6px 0">{{ props.contador.visitas }}</p>
    <div style="display:flex;gap:8px">
      <button @click="store.inc(props.contador.id)">+1</button>
      <button @click="store.reset(props.contador.id)">Reset</button>
      <button @click="store.remove(props.contador.id)">Eliminar</button>
    </div>
  </div>
</template>
