import { createStore } from 'vuex'
import auth from './modules/auth.module'
import task from './modules/task.module'



export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, task
  }
})
