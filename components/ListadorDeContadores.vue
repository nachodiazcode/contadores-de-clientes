
<script setup lang="ts">
import Contador from './Contador.vue'
import { useContadores } from './../stores/contadores' // o '../stores/contadores'

const store = useContadores()
</script>

<template>
  <ul style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px">
    <li v-for="c in store.filtrados" :key="c.id">
      <Contador :contador="c" />
    </li>
  </ul>
</template>
