import axios from '../../axios/task'
import store from '../index'

export default {
  namespaced: true,
  state(){
    return {
      tasks: []
    }
  },
  //  --- MUTATIONS ---
  mutations : {
    setTask(state, tasks) {
      state.tasks = tasks
    },
    addTask(state,task) {
      state.tasks.unshift(task)
    },
    delTask(state,id) {
      state.tasks = state.tasks.filter(c => c.id !== id)
    },
    editTask(state,task) {
      state.tasks = state.tasks.map(c => {
        if (c.id === task.id) {
          return task
        }
        return c
      })
    },
  },
  // --- ACTIONS ---
  actions: {
    async loadAll({commit}){
      try{
        const {data} = await axios.get(`/tasks.json`)      
        const tasks = Object.keys(data).map(id => ({...data[id], id}))
        tasks.reverse()
        commit('setTask', tasks)
      }catch(e){
    
      }
    },
    async loadOne(_,id){
      try{
        const {data} = await axios.get(`/tasks/${id}.json`)
        return data
      }catch(e){
        console.log(e)
      }
    },
    async create({commit},payload) {
      try{
        const createdAt = new Date().toLocaleDateString()
        const task = {...payload, createdAt, status: 'new'}
        const {data} = await axios.post(`/tasks.json`,task)
        commit('addTask', {...payload, id: data.name})
      } catch(e) {
        console.log(e)
      }
    },
    async update({commit}, payload ){
      try{
        await axios.put(`/tasks/${payload.id}.json`, payload)
        commit('editTask', payload)
      } catch(e){
        console.log(e)
      }
    },
    async remove({commit}, id){
      try{
        await axios.delete(`/tasks/${id}.json`)
        commit('delTask', id)
      }catch(e){
        console.log(e)
      }
    },
  },
  //  --- GETTERS ---
  getters: {
    tasks(state) {
      return state.tasks
    },
    tasksCount(state) {
      return  state.tasks.length
    }
  }
}