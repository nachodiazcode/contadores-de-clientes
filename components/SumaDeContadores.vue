<script setup lang="ts">
import { useContadores } from './../stores/contadores'   // <- import explícito

const store = useContadores()
</script>

<template>
  <div style="padding:12px;border:1px solid #e5e7eb;border-radius:12px">
    <strong>Total visitas:</strong> {{ store.totalVisitas }}
  </div>
</template>
