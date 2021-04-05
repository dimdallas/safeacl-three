import BackEndApi from '../../services/api/backEnd'

const state = {
    token: localStorage.getItem('token') || null,
    // userId: localStorage.getItem('user_id') || null
}

const getters = {          /**Retrieve Data from Store,get the data from the state */
    loggedIn(state) {
        // console.log("Token: " + state.token)
        return state.token != null
    }
}

const mutations = {
    retrieveToken(state, {token}) {
        state.token = token
    },
    deleteToken(state) {
        // console.log(state)
        state.token = null
        // state.userId = null
    }
}

const actions = {
    retrieveToken(context, credentials) {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
            }
            BackEndApi.postCalls('/auth/login', credentials, headers)
                .then((response) => {

                    // console.log(response)

                    const token = response.data.token
                    // const userId = response.data.user.id

                    // store token && user_id
                    localStorage.setItem('token', token);
                    // localStorage.setItem('user_id', userId)

                    context.commit('retrieveToken', {token})
                    resolve(response)

                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    registerUser(context, payload) {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
            }
            BackEndApi.postCalls('/auth/register', payload, headers)
                .then(response => {
                    resolve(response)
                    // console.log(response)
                })
                .catch(error => {
                    console.log(error)
                    reject(error)
                })
        })
    },
    getOverview(context, token){
        // console.log(token)
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: token
            }
            // console.log(headers)
            BackEndApi.getCalls('/users/profile', headers)
                .then((response) => {
                    resolve(response)
                    console.log(response)
                })
                .catch(error => {
                    // console.log(error)
                    reject(error)
                })
        })
    },
    deleteToken(context) {
        if (context.getters.loggedIn) {

            //delete the token && user_id
            localStorage.removeItem('token')
            // localStorage.removeItem('user_id')

            context.commit('deleteToken')
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}