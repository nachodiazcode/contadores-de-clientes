<template>
  <main class="layout">
    <!-- Buscador -->
    <input
      v-model="filtro"
      placeholder="🔍 Buscar contador..."
      class="buscador"
    />

    <!-- Formulario para agregar -->
    <form @submit.prevent="agregarContador" class="form">
      <input
        v-model="nombre"
        placeholder="Nombre del contador"
        class="input"
      />
      <button type="submit" class="btn-agregar" :disabled="isFull">Agregar</button>
    </form>

    <p v-if="isFull" class="aviso">⚠️ Límite de 20 contadores alcanzado.</p>

    <!-- Lista -->
    <ul class="contador-lista">
      <li v-for="c in contadoresFiltrados" :key="c.id" class="contador-item">
        <input type="text" :value="c.nombre" class="nombre" disabled />
        <div class="acciones">
          <button class="btn-mayor" @click="aumentar(c.id)" :disabled="c.valor >= 20">+</button>
          <span class="valor">{{ c.valor }}</span>
          <button class="btn-menor" @click="disminuir(c.id)" :disabled="c.valor <= 0">−</button>
          <button class="btn-delete" @click="eliminarContador(c.id)">🗑</button>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type Contador = { id: number; nombre: string; valor: number }

const contadores = ref<Contador[]>([])
const nombre = ref('')
const filtro = ref('')
let idCounter = 0

onMounted(() => {
  const saved = localStorage.getItem('contadores')
  if (saved) {
    contadores.value = JSON.parse(saved)
    idCounter = contadores.value.length > 0 ? Math.max(...contadores.value.map(c => c.id)) : 0
  }

  const savedFiltro = sessionStorage.getItem('filtro')
  if (savedFiltro) filtro.value = savedFiltro
})

watch(contadores, (nuevos) => {
  localStorage.setItem('contadores', JSON.stringify(nuevos))
}, { deep: true })

watch(filtro, (nuevo) => {
  sessionStorage.setItem('filtro', nuevo)
})

const isFull = computed(() => contadores.value.length >= 20)

const contadoresFiltrados = computed(() =>
  contadores.value.filter(c =>
    c.nombre.toLowerCase().includes(filtro.value.toLowerCase())
  )
)

function agregarContador() {
  const n = nombre.value.trim()
  if (n === '' || n.length > 20 || isFull.value) return
  contadores.value.push({ id: ++idCounter, nombre: n, valor: 0 })
  nombre.value = ''
}

function eliminarContador(id: number) {
  contadores.value = contadores.value.filter(c => c.id !== id)
}

function aumentar(id: number) {
  const c = contadores.value.find(c => c.id === id)
  if (c && c.valor < 20) c.valor++
}

function disminuir(id: number) {
  const c = contadores.value.find(c => c.id === id)
  if (c && c.valor > 0) c.valor--
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

.layout {
  min-height: 100dvh;
  padding: 2rem 1rem;
  font-family: 'Ubuntu', sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Buscador */
.buscador {
  width: 95%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 9999px;
  background-color: #1e293b;
  border: none;
  color: #ccc;
  box-shadow: inset 0 0 0 1px #334155;
  transition: box-shadow 0.2s ease;
}
.buscador:focus {
  outline: none;
  box-shadow: 0 0 0 2px #38bdf8 inset;
}

/* Formulario */
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  width: 100%;
  max-width: 600px;
}

.input {
  flex: 1 1 240px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  background-color: #032151;
  color: white;
  box-shadow: inset 0 0 0 1px #055ad2;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #024f70 inset;
}

.btn-agregar {
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  background: linear-gradient(to right, #ff4d9d, #ff914d);
  color: white;
  box-shadow: 0 4px 14px rgba(255, 77, 157, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-agregar:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(255, 77, 157, 0.5);
}
.btn-agregar:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.aviso {
  font-weight: bold;
  color: #f87171;
}

/* Lista */
.contador-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  padding: 0;
}

/* Item */
.contador-item {
  display: flex;
  flex-direction: column;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 0.75rem;
  gap: 0.75rem;
}
.nombre {
  background: #0f172a;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 0.9rem;
  width: 95%;
}
.acciones {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: flex-end;
}
.valor {
  font-weight: bold;
  min-width: 24px;
  text-align: center;
  font-size: 1rem;
}

/* Botones */
button {
  font-size: 0.9rem;
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease;
}
.btn-mayor {
  background-color: #22c55e;
  color: white;
}
.btn-mayor:hover:not(:disabled) {
  background-color: #16a34a;
}
.btn-mayor:disabled {
  background-color: #22c55e88;
}

.btn-menor {
  background-color: #ef4444;
  color: white;
}
.btn-menor:hover:not(:disabled) {
  background-color: #dc2626;
}
.btn-menor:disabled {
  background-color: #ef444488;
}

.btn-delete {
  background-color: #334155;
  color: white;
}
.btn-delete:hover {
  background-color: #475569;
}

/* Responsive */
@media (max-width: 480px) {
  .form {
    flex-direction: column;
    align-items: stretch;
  }
  .contador-item {
    padding: 0.5rem;
  }
  .acciones {
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
