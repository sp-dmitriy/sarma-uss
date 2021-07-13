import axios from 'axios'

const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state() {
    token : localStorage.getItem(TOKEN_KEY) 
  },
  mutations:{
    setToken(state,token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login({commit, dispatch}, payload){
      try{       
        const url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_KEY}`
        const {data} = await axios.post(url,{...payload,returnSecureToken: true})
        commit('setToken',data.idToken)
       
      }catch(e){
        
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuth(_,getters){
      return !!getters.token
    }
  }
} 