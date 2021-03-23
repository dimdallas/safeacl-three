import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false
  },
  getters: {
    getAuth()  {
      return this.state.authenticated
    }
  },
  mutations: {
    SET_AUTH (auth) {
      // console.log("in SET_AUTH")
      this.state.authenticated = auth
    }
  },
  actions: {
    set_Auth: ({commit, auth}) => commit('SET_AUTH', auth)
  },
  modules: {
  }
})

// export default new Vuex.Store({
//   state: {
//     authenticated: false
//   },
//   getters: {
//     getAuth: state => {
//       return state.authenticated
//     }
//   },
//   mutations: {
//     SET_AUTH_TRUE () {
//       this.state.authenticated = true
//       // Vue.set(this.state.authenticated, auth)
//     },
//     SET_AUTH_FALSE () {
//       this.state.authenticated = false
//       // Vue.set(this.state.authenticated, auth)
//     }
//   },
//   actions: {
//     // setAuth: ({commit, auth}) => commit('SET_AUTH', auth),
//     set_Auth (auth) {
//       if(auth){
//         this.commit('SET_AUTH_TRUE')
//       }
//       else{
//         this.commit('SET_AUTH_FALSE')
//       }
//     }
//   },
//   modules: {
//   }
// })

