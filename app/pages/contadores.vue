<template>
  <main class="layout">
    <section class="container">
      <ul class="contador-lista">
        <form @submit.prevent="agregarContador" class="form">
          <input v-model="filtro" placeholder="🔍 Buscar contador..." class="buscador" />

          <!-- Botón Agregar (modal) -->
          <div class="agregar-wrapper">
            <button class="btn-agregar" @click.prevent="mostrarModal = true" :disabled="isFull">
              ➕ Agregar contador
            </button>
          </div>

          <!-- FILTROS Y ORDENAMIENTO -->
          <div class="filtrar-wrapper">
            <!-- Ordenar -->
            <div class="f-row">
              <label class="lbl">Ordenar por</label>
              <select v-model="ordenCampo" class="select">
                <option value="nombre">Nombre</option>
                <option value="valor">Valor</option>
              </select>
              <select v-model="ordenDireccion" class="select">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>

            <!-- Filtrar mayores/menores a X -->
            <div class="f-row">
              <label class="lbl">Filtrar</label>
              <select v-model="filtroTipo" class="select">
                <option value="todos">Todos</option>
                <option value="mayores">Mayores a</option>
                <option value="menores">Menores a</option>
              </select>
              <input
                v-model.number="filtroNumero"
                type="number"
                class="number-input"
                :disabled="filtroTipo==='todos'"
                placeholder="Ej: 5"
                min="0"
                max="20"
              />
              <button type="button" class="btn-borrar" @click="borrarFiltros">Borrar filtros</button>
            </div>
          </div>
        </form>

        <p v-if="isFull" class="aviso">⚠️ Límite de 20 contadores alcanzado.</p>

        <!-- LISTA -->
        <li v-for="c in contadoresFiltrados" :key="c.id" class="contador-item">
          <!-- Nombre: lectura o edición -->
          <template v-if="editId === c.id">
            <input
              v-model="editBuffer"
              class="nombre editable"
              @keyup.enter="guardarNombre()"
              @keyup.esc="cancelarEdicion()"
              aria-label="Editar nombre"
            />
          </template>
          <template v-else>
            <input type="text" :value="c.nombre" disabled class="nombre" aria-label="Nombre del contador" />
          </template>

          <!-- Acciones -->
          <button class="btn-mayor" @click="aumentar(c.id)" :disabled="c.valor >= 20" aria-label="Aumentar">+</button>
          <span class="valor">{{ c.valor }}</span>
          <button class="btn-menor" @click="disminuir(c.id)" :disabled="c.valor <= 0" aria-label="Disminuir">−</button>

          <!-- Editar / Guardar / Cancelar -->
          <button v-if="editId !== c.id" class="btn-edit" @click="iniciarEdicion(c)" aria-label="Editar nombre">✏️</button>
          <div v-else class="edit-actions">
            <button class="btn-save" @click="guardarNombre()" aria-label="Guardar">✓</button>
            <button class="btn-cancel-edit" @click="cancelarEdicion()" aria-label="Cancelar">✖</button>
          </div>

          <!-- Basurero con aire a la derecha -->
          <button class="btn-delete" @click="eliminarContador(c.id)" aria-label="Eliminar">🗑</button>
        </li>
      </ul>

      <!-- Footer con total (independiente de filtros) -->
      <footer class="footer-total">
        <span>Total de valores:</span>
        <strong>{{ totalGeneral }}</strong>
      </footer>
    </section>

    <!-- MODAL -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="modal">
        <h2 class="modal-title">🧮 Nombre del contador</h2>
        <input
          ref="inputModalRef"
          v-model="nombre"
          placeholder="Ej: Ignacio Díaz"
          class="modal-input"
          @keyup.enter="confirmarAgregar"
        />
        <div class="modal-buttons">
          <button class="btn-agregar" @click="confirmarAgregar" :disabled="!nombre.trim() || nombre.trim().length>20">Confirmar</button>
          <button class="btn-cancelar" @click="mostrarModal = false">Cancelar</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { background, w } from '../../node_modules/ipx/dist/index.d'
import { colorPicker } from '../../node_modules/@nuxt/ui/.nuxt/ui'

type Contador = { id: number; nombre: string; valor: number }

const contadores = ref<Contador[]>([])
const nombre = ref('')
const filtro = ref('')
let idCounter = 0

/* Filtros y orden */
const ordenCampo = ref<'nombre'|'valor'>('nombre')
const ordenDireccion = ref<'asc'|'desc'>('asc')
const filtroTipo = ref<'todos'|'mayores'|'menores'>('todos')
const filtroNumero = ref<number | null>(null)

/* Modal */
const mostrarModal = ref(false)
const inputModalRef = ref<HTMLInputElement | null>(null)
watch(mostrarModal, async (open) => {
  if (open) { await nextTick(); inputModalRef.value?.focus() }
})

/* Edición de nombre */
const editId = ref<number|null>(null)
const editBuffer = ref('')

function iniciarEdicion(c: Contador) {
  editId.value = c.id
  editBuffer.value = c.nombre
}
function guardarNombre() {
  if (editId.value === null) return
  const nuevo = editBuffer.value.trim()
  if (!nuevo || nuevo.length > 20) return
  const c = contadores.value.find(x => x.id === editId.value)
  if (c) c.nombre = nuevo
  editId.value = null
  editBuffer.value = ''
}
function cancelarEdicion() {
  editId.value = null
  editBuffer.value = ''
}

/* Persistencia */
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

/* Reglas */
const isFull = computed(() => contadores.value.length >= 20)

/* Filtro + Orden */
const contadoresFiltrados = computed(() => {
  let lista = contadores.value.filter(c =>
    c.nombre.toLowerCase().includes(filtro.value.toLowerCase())
  )
  if (filtroTipo.value !== 'todos' && filtroNumero.value !== null && !Number.isNaN(filtroNumero.value)) {
    if (filtroTipo.value === 'mayores') lista = lista.filter(c => c.valor > (filtroNumero.value as number))
    if (filtroTipo.value === 'menores') lista = lista.filter(c => c.valor < (filtroNumero.value as number))
  }
  const dir = ordenDireccion.value === 'asc' ? 1 : -1
  lista = [...lista].sort((a, b) => {
    return ordenCampo.value === 'nombre'
      ? a.nombre.localeCompare(b.nombre) * dir
      : (a.valor - b.valor) * dir
  })
  return lista
})

/* Total independiente de filtros */
const totalGeneral = computed(() => contadores.value.reduce((acc, c) => acc + c.valor, 0))

/* Acciones */
function confirmarAgregar() {
  const n = nombre.value.trim()
  if (n === '' || n.length > 20 || isFull.value) return
  contadores.value.push({ id: ++idCounter, nombre: n, valor: 0 })
  nombre.value = ''
  mostrarModal.value = false
}

function agregarContador() { // (se mantiene por compatibilidad con tu submit.prevent)
  const n = nombre.value.trim()
  if (n === '' || n.length > 20 || isFull.value) return
  contadores.value.push({ id: ++idCounter, nombre: n, valor: 0 })
  nombre.value = ''
}

function eliminarContador(id: number) {
  contadores.value = contadores.value.filter(c => c.id !== id)
  if (editId.value === id) cancelarEdicion()
}

function aumentar(id: number) {
  const c = contadores.value.find(c => c.id === id)
  if (c && c.valor < 20) c.valor++
}

function disminuir(id: number) {
  const c = contadores.value.find(c => c.id === id)
  if (c && c.valor > 0) c.valor--
}

function borrarFiltros() {
  filtro.value = ''
  filtroTipo.value = 'todos'
  filtroNumero.value = null
  ordenCampo.value = 'nombre'
  ordenDireccion.value = 'asc'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

/* ======== PALETA v18.0 (más pro) ======== 
   Azul fondo:    #0B1F3A → #1D4ED8 (gradiente sutil)
   Teal UI:       #06B6D4
   Navy oscuro:   #0F172A
   Gris borde:    #CBD5E1
   Acento btn:    gradiente magenta (#F472B6) → naranja (#FB923C)
================================================ */

.layout {
  min-height: 100dvh;
  color: white;
  font-family: 'Ubuntu', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center; /* fix: antes tenías 'center center' */
  gap: 1rem;
  width: 100%;
  background: radial-gradient(1200px 600px at 20% -10%, #1d4ed8 0%, #0b1f3a 55%, #0b1f3a 100%);
}

.container {
  padding: 1rem;
  margin: 0 auto;
  max-width: 60%;
}

/* Formulario */
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

/* Inputs principales */
.input {
  flex: 1 1 100%;
  padding: 1rem 2rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 28px;
  border: transparent;
  position: relative;
  background-color: #6ea8ff33; /* tono suave */
  color: white;
  box-shadow: 0 0 0 2px #334155 inset;
  transition: all 0.2s ease;
  width: 100%;
}
.input::placeholder { color: #fff; }
.input:focus { outline: none; box-shadow: 0 0 0 2px #38bdf8 inset; }

/* Botón Agregar */
.agregar-wrapper { display: flex; justify-content: flex-end; width: 100%; margin-top: -0.5rem; }

.btn-agregar {
  padding: 0.9rem 2rem;
  font-size: 1rem;
  border-radius: 9999px;
  border: none;
  font-weight: bold;
  background: linear-gradient(to right, #f472b6, #fb923c);
  color: white;
  box-shadow: 0 4px 14px rgba(244, 114, 182, 0.35);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-agregar:hover:not(:disabled) { transform: scale(1.05); box-shadow: 0 6px 18px rgba(244, 114, 182, 0.55); }
.btn-agregar:disabled { opacity: 0.45; cursor: not-allowed; }

/* Buscador */
.buscador {
  width: 100%;
  font-size: 1rem;
  padding: 1.2rem 2rem;
  border-radius: 28px;
  border: 2px solid #0ea5b3;
  background-color: #0ea5b333; /* teal suave */
  color: #eaf2ff;
  transition: all 0.2s ease;
}
.buscador::placeholder { color: #eaf2ff; opacity: .9; }
.buscador:focus { outline: none; box-shadow: 0 0 0 2px #38bdf8 inset; background:#0ea5b355; }

/* Barra de filtros */
.filtrar-wrapper {
  background: #0b1f3a55;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.9rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08) inset;
}
.f-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem; }
.lbl { font-weight: 700; }

.select, .number-input {
  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  border: 2px solid #cbd5e1;
  background: #ffffff;
  color: #0b1736;
  outline: none;
}
.number-input:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-borrar {
  padding: 0.6rem 0.9rem;
  border-radius: 9999px;
  border: none;
  font-weight: 700;
  background: #e2e8f0;
  color: #334155;
  transition: 0.15s ease;
}
.btn-borrar:hover { background: #cbd5e1; }

/* Aviso límite */
.aviso { text-align: center; color: #f87171; font-weight: bold; }

/* Lista */
.contador-lista { display: flex; flex-direction: column; padding: 0; width: 100%; }

/* Ítem de contador */
.contador-item {
  width: 100%;
  display: flex;
  align-items: center;
  background: #06b6d4;           /* teal moderno */
  border: 1px solid #0ea5b3;
  border-radius: 14px;
  padding: 0.85rem 0.9rem;        /* > right padding para aire del basurero */
  margin-top: 0.6rem;
  gap: 0.75rem;
  transition: background 0.2s ease, transform 0.06s ease;
}
.contador-item:hover { background: #0891b2; }

/* Nombre */
.nombre {
  flex: 1;
  background: #0f172a;
  padding: 0.65rem 1rem;
  border-radius: 10px;
  border: none;
  color: #e5e7eb;
}
.nombre.editable {
  background: #ffffff;
  color: #0f172a;
  border: 2px solid #cbd5e1;
}

/* Valor */
.valor { font-weight: 800; min-width: 32px; text-align: center; font-size: 1.05rem; color:#0f172a; }

/* Botones acción */
button { border: none; padding: 0.5rem 0.75rem; border-radius: 10px; font-weight: 800; cursor: pointer; transition: all 0.15s ease; }

.btn-mayor { background-color: #22c55e; color: white; }
.btn-mayor:hover:not(:disabled) { background-color: #16a34a; }
.btn-mayor:disabled { background-color: #22c55e88; }

.btn-menor { background-color: #ef4444; color: white; }
.btn-menor:hover:not(:disabled) { background-color: #dc2626; }
.btn-menor:disabled { background-color: #ef444488; }

/* Editar nombre */
.btn-edit { background:#e2e8f0; color:#0f172a; }
.btn-edit:hover { background:#cbd5e1; }
.edit-actions { display:flex; gap:.4rem; }
.btn-save { background:#22c55e; color:#fff; }
.btn-save:hover { background:#16a34a; }
.btn-cancel-edit { background:#f1f5f9; color:#0f172a; }
.btn-cancel-edit:hover { background:#e2e8f0; }

/* Basurero con aire a la derecha */
.btn-delete { background-color: #1f2937; color: #fff; margin-right: .35rem; }
.btn-delete:hover { background-color: #374151; }

/* Footer total */
.footer-total{
  margin-top: 1rem;
  display:flex;
  justify-content: flex-end;
  align-items: center;
  gap:.5rem;
  color:#0b1736;
  font-weight:700;
  background:#ffffffcc;
  padding:.6rem 1rem;
  border-radius:12px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  backdrop-filter: blur(6px);
}

/* ====== Responsive tweaks ====== */
@media (max-width: 1024px) {
  .container { max-width: 80%; }
  /* Filtros en 2 columnas cómodas */
  .filtrar-wrapper { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem 1rem; }
  .filtrar-wrapper .f-row { flex-wrap: nowrap; }
  .contador-item { padding-right: 1rem; } /* aire para basurero en tablet */
}
@media (max-width: 768px) {
  .container { max-width: 100%; }
  .filtrar-wrapper { grid-template-columns: 1fr; }
  .select, .number-input { width: 100%; }
  .contador-item { padding-right: .9rem; }
}
@media (max-width: 425px) {
  .container { max-width: 100%; }
  .contador-item { padding-right: .75rem; background: #0ea5b3; }
}

/* MODAL */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(2, 6, 23, 0.55);
  backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 999;
}
.modal {
  background: white; color: #1e293b; padding: 2rem; border-radius: 16px;
  width: 90%; max-width: 420px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.25s ease-out; display: flex; flex-direction: column; gap: 1.5rem;
}
.modal-title { font-size: 1.3rem; font-weight: bold; text-align: center; color:#0f172a; }
.modal-input {
  padding: 0.75rem 1rem; font-size: 1rem; border: 2px solid #cbd5e1; border-radius: 10px;
  background: #f8fafc; color: #1e293b; transition: 0.2s ease;
}
.modal-input:focus { border-color: #38bdf8; background: white; outline: none; }
.modal-buttons { display: flex; justify-content: space-between; gap: 1rem; }
.btn-cancelar {
  padding: 0.75rem 1.25rem; border-radius: 9999px; font-weight: bold;
  background: #e2e8f0; color: #334155; border: none; transition: 0.2s ease;
}
.btn-cancelar:hover { background: #cbd5e1; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }
</style>
