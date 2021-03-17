import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false
  },
  mutations: {
    SET_AUTH (auth) {
      this.state.authenticated = auth
    }
  },
  actions: {
    setAuth: ({commit, auth}) => commit('SET_AUTH', auth)
  },
  modules: {
  }
})
