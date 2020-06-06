import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const state = {
  token: localStorage.getItem('token'),
  user: null,
  loaded: false,
  userId: localStorage.getItem('userId'),
  postulacionesNuevas: 0
}

const actions = {
  login ({ commit }, newState) {
    commit('setState', newState)
    localStorage.token = newState.token
    localStorage.userId = newState.userId
  }
}

const mutations = {
  setState (state, newState) {
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  }
}

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },
    state,
    actions,
    mutations,
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
