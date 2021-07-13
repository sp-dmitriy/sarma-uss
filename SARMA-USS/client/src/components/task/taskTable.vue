<template>
  <h2 v-if="tasks.length === 0" class="text-center mt-5">Заявок нет</h2>
  <table v-else class="table table-hover align-middle">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Заявитель</th>
        <th scope="col">Тип</th>
        <th scope="col">Описание</th>
        <th v-if="true" class="text-end" scope="col">Действия</th>
        <th v-else scope="col">Принял</th>
      </tr>
    </thead>
    <tbody>

      <tr v-for="(task, idx) in tasks" :key="task.id" >
        <th class="td__link" scope="row" @click="view(task.id)">
          {{idx+1}}&nbsp;
          <app-status :type="task.status"></app-status>
          <div style="font-size: 0.7rem;">Рогозинский Василий</div>
        </th>
        <td>{{task.fio}}</td>
        <td>
          {{showType(task.type)}}
          <div style="font-size: 0.7rem;" :class="[task.priority === '5' ?  'text-danger' : '', task.priority === '4' ?  'text-primary' : '']">{{showPriority(task.priority)}}</div>
        </td>
        <td>{{task.description}}</td>
        <td v-if="true" class="text-end">
          <font-awesome-icon class="text-primary" icon="eye" @click="view(task.id)"/>&nbsp;
          <font-awesome-icon class="text-primary" icon="edit" @click="edit(task.id)"/>&nbsp;
        </td>
        <td v-else>{{task.admin}}</td>
      </tr>
    </tbody>

  </table>
  <teleport to="body">   
    <app-modal v-if="modal" title="Редактирование заявки" @close="modal = false">
      <task-edit  :task="task" @close="modal = false"></task-edit>
    </app-modal>
  </teleport> 
</template>

<script>
import { ref } from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {showType} from '../../utils/showType'
import {showPriority} from '../../utils/showPriority'
import AppModal from '../../components/ui/AppModal'
import TaskEdit from '../../components/task/taskEdit'
import AppStatus from '../../components/ui/AppStatus'

export default({
  props: ['tasks'],
  components: { AppModal, AppStatus, TaskEdit },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const modal = ref(false)
    const task = ref({})

    const view = (id) =>  router.push(`/${id}`)
    const edit = async (id) => { 
      task.value = await store.dispatch('task/loadOne', id)
      task.value = {...task.value, id}
      modal.value = true
    }  

    return { AppModal, AppStatus, TaskEdit, modal, showType, showPriority, view, edit, task }  
  },
})
</script>
<style scoped>
.td__link{
  cursor:pointer;
}
</style>