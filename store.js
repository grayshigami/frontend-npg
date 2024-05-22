import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemEditado: null
    },
    mutations: {
        setItemEditado(state, item) {
            state.itemEditado = item;
        },
        limpiarItemEditado(state) {
            state.itemEditado = null;
        }
    },
    actions: {
        guardarEdicion({ state }) {
            state.itemEditado = null;
        }
    }
})