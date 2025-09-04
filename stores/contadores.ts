import { createStore } from 'vuex'

const store = createStore({
  state: () => ({
    contadores: [],
    modalAbierto: false,
    orden: 'nombre-asc',
    soloActivos: false,
    texto: ''
  }),

  mutations: {
    agregarContador(state, nombre: string) {
      if (state.contadores.length < 20 && nombre.length > 0) {
        state.contadores.push({ nombre, valor: 0 })
      }
    },

    eliminarContador(state, index: number) {
      state.contadores.splice(index, 1)
    },

    incrementar(state, index: number) {
      if (state.contadores[index].valor < 20) {
        state.contadores[index].valor++
      }
    },

    decrementar(state, index: number) {
      if (state.contadores[index].valor > 0) {
        state.contadores[index].valor--
      }
    },

    setModal(state, abierto: boolean) {
      state.modalAbierto = abierto
    },

    // Nuevos mutations para filtro y orden
    SET_ORDEN(state, value: string) {
      state.orden = value
    },

    SET_SOLO_ACTIVOS(state, value: boolean) {
      state.soloActivos = value
    },

    SET_TEXTO(state, value: string) {
      state.texto = value
    }
  }
})

export default store
