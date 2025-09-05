<template>
  <main class="layout">
    <!-- Buscador -->
    <input
      v-model="filtro"
      placeholder="🔍 Buscar contador..."
      class="buscador"
    />

    <!-- Formulario nuevo contador -->
    <form @submit.prevent="agregarContador" class="form">
      <input v-model="nombre" placeholder="Nombre del contador" class="input" />
      <button type="submit" class="btn-agregar" :disabled="isFull">Agregar</button>
    </form>

    <p v-if="isFull" class="aviso">⚠️ Límite de 20 contadores alcanzado.</p>

    <!-- Lista filtrada -->
    <ul class="contador-lista">
      <li
        v-for="c in contadoresFiltrados"
        :key="c.id"
        class="contador-item"
      >
        <input type="text" :value="c.nombre" disabled class="nombre" />
        <button class="btn-mayor" @click="aumentar(c.id)" :disabled="c.valor >= 20">+</button>
        <span class="valor">{{ c.valor }}</span>
        <button class="btn-menor" @click="disminuir(c.id)" :disabled="c.valor <= 0">−</button>
        <button class="btn-delete" @click="eliminarContador(c.id)">🗑</button>
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
  padding: 3rem 1.5rem;
  color: white;
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  max-width: 1300px;
  margin: 0 auto;
}

/* Formulario */
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: left;
  width:100%;
}

.input {
  flex: 1 1 100%;

  padding: 0.55rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 18px;
  border: none;
  position:relative;
  background-color: #3a414e;
  color: white;
  box-shadow: 0 0 0 2px #334155 inset;
  transition: all 0.2s ease;
}
.input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #38bdf8 inset;
}

/* Botón Agregar */
.btn-agregar {
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
  border: none;
  font-weight: bold;
  background: linear-gradient(to right, #ff4d9d, #ff914d);
  color: white;
  box-shadow: 0 4px 14px rgba(255, 77, 157, 0.3);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-agregar:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(255, 77, 157, 0.5);
}
.btn-agregar:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Buscador */
.buscador {
  width: 98%;
  padding: 0.7rem 1rem;
  border-radius: 9999px;
  border: none;
  background-color: #1e293b;
  color: white;
  box-shadow: 0 0 0 2px #334155 inset;
  transition: all 0.2s ease;
}
.buscador:focus {
  outline: none;
  box-shadow: 0 0 0 2px #38bdf8 inset;
}

/* Aviso límite */
.aviso {
  text-align: center;
  color: #f87171;
  font-weight: bold;
}

/* Lista de contadores */
.contador-lista {
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 90%;
}

/* Ítem */
.contador-item {
  width: 108%;
  display: flex;
  position: relative;
  right:62px;
  align-items: center;
  background: #2856a0;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1rem;
  gap: 1rem;
  transition: background 0.2s ease;
}
.contador-item:hover {
  background: #273449;
}

.nombre {
  flex: 2;
  background: #0f172a;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  color: white;
}

/* Valor */
.valor {
  font-weight: bold;
  min-width: 28px;
  text-align: center;
  font-size: 1.1rem;
}

/* Botones */
button {
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease;
}

/* Botón + */
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

/* Botón - */
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

/* Botón 🗑 */
.btn-delete {
  background-color: #334155;
  color: #fff;
}
.btn-delete:hover {
  background-color: #475569;
}

/* Responsive */

@media (max-width: 1390px) {
  .buscador{
    width: 94%;
    position: relative;
    right:2%;
  }
  .input{
    background-color: #3c3a3c;
    max-width: 94%;
    position: relative;
    left:0%;
    color:#95b0f1;
  }

  .nombre{
    width: 94px;
  }
  .contador-item {
  width: 104%;
  display: flex;
  align-items: center;
  position: relative;
  right:5%;
  background: #5e5855;
  border: 1px solid #334155;
  border-radius: 12px;

  gap: 0.5rem;
  transition: background 0.2s ease;

  }

}


@media (max-width: 624px) {
  .buscador{
    width: 94%;
    position: relative;
    right:0%;
  }
  .input{
    background-color: #1b2d48;
    width: 100%;
    color:#95b0f1;
  }
  .contador-item {
  width: 102%;
  display: flex;
  align-items: center;
  position: relative;
  right:5%;
  background: #0c64f2;
  border: 1px solid #334155;
  border-radius: 12px;

  gap: 0.5rem;
  transition: background 0.2s ease;

}




}
</style>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

</style>

