// stores/contadores.ts
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage, useSessionStorage } from '@vueuse/core'

export type Contador = {
    id: number
    nombre: string
    visitas: number
    activo: boolean
    createdAt: string
}

type OrdenClave = 'nombre' | 'visitas'
type Direccion = 'asc' | 'desc'

export const useContadores = defineStore('contadores', () => {
    // Estado (persistencia)
    const contadores = useStorage<Contador[]>('cc:contadores', [])

    // Filtros y orden en SessionStorage (¡son Refs!)
    const texto = useSessionStorage<string>('cc:filtro:texto', '')
    const soloActivos = useSessionStorage<boolean>('cc:filtro:activos', false)
    const orden = useSessionStorage<{ clave: OrdenClave; dir: Direccion }>(
        'cc:orden',
        { clave: 'nombre', dir: 'asc' }
    )

    // Derivados
    const isFull = computed(() => contadores.value.length >= 20)

    const visibles = computed(() => {
        const t = texto.value.trim().toLocaleLowerCase()
        const arr = contadores.value.filter(c =>
            (!soloActivos.value || c.activo) &&
            (t === '' || c.nombre.toLocaleLowerCase().includes(t))
        )
        const dir = orden.value.dir === 'asc' ? 1 : -1
        const k = orden.value.clave // 'nombre' | 'visitas'
        return [...arr].sort((a, b) => {
            const va = a[k]
            const vb = b[k]
            return (va < vb ? -1 : va > vb ? 1 : 0) * dir
        })
    })

    const totalVisitas = computed(() =>
        contadores.value.reduce((s, c) => s + c.visitas, 0)
    )

    // Actions
    function add(nombre: string) {
        const n = nombre.trim()
        if (isFull.value || n.length === 0 || n.length > 20) return
        // sin usar .at() para evitar exigir ES2022
        const last = contadores.value.length
            ? contadores.value[contadores.value.length - 1].id
            : 0
        const id = last + 1
        contadores.value.push({
            id,
            nombre: n,
            visitas: 0,
            activo: true,
            createdAt: new Date().toISOString(),
        })
    }

    function inc(id: number) {
        const c = contadores.value.find(x => x.id === id); if (!c) return
        if (c.visitas < 20) c.visitas++
    }
    function dec(id: number) {
        const c = contadores.value.find(x => x.id === id); if (!c) return
        if (c.visitas > 0) c.visitas--
    }
    function reset(id: number) {
        const c = contadores.value.find(x => x.id === id); if (!c) return
        c.visitas = 0
    }
    function remove(id: number) {
        contadores.value = contadores.value.filter(x => x.id !== id)
    }
    function toggle(id: number) {
        const c = contadores.value.find(x => x.id === id); if (!c) return
        c.activo = !c.activo
    }

    // Helpers para UI
    function setOrden(clave: OrdenClave, dir: Direccion) {
        orden.value = { clave, dir }
    }
    function setFiltros(_texto: string, _soloActivos: boolean) {
        texto.value = _texto
        soloActivos.value = _soloActivos
    }

    return {
        // state
        contadores, texto, soloActivos, orden,
        // getters
        visibles, totalVisitas, isFull,
        // actions
        add, inc, dec, reset, remove, toggle, setOrden, setFiltros,
    }
})
