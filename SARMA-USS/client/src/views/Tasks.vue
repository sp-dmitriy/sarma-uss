<template>
  <app-loader v-if="loading"></app-loader>
  <app-page  v-else  title="Список заявок">

      <div class="row mb-2 align-items-center">
        <div class="col text-start align-self-end">
          <a href="#" class="nav-link" @click="toggleFilter">{{isFilter ? 'Скрыть': 'Показать'}} фильтр</a>
        </div>
        
        <div class="col-8 text-center">
          <h1  class="display-5 fw-normal">Заявки пользователей</h1>       
          <the-badget v-for="s in stats" :key="s" :type="s" :num="tasksAll.filter(t => t.status === s).length" @changeHandler="badgetFilter(s)" />
          <the-badget type="all" :num="tasksAll.length" @changeHandler="badgetFilter('all')"/>
        </div>
        <div class="col">
          <button type="button" class="btn btn-outline-primary ms-5" @click="modal = true">Добавить</button>
        </div>
      </div>     

    <task-filter v-if="isFilter" v-model="filter" :status="filter.status"></task-filter>
    <task-table :tasks="tasks" />
    <app-pagination v-if="tasks.length > 10"></app-pagination>
  </app-page>

   <teleport to="body">   
      <app-modal v-if="modal" title="Новая заявка" @close="modal = false">
        <task-add @close="modal = false"></task-add>
      </app-modal>
    </teleport> 
</template>

<script>
import { ref, computed, onUpdated, onMounted } from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import AppModal from '../components/ui/AppModal'
import TaskTable from '../components/task/taskTable'
import TaskAdd from '../components/task/taskAdd'
import TheBadget from '../components/TheBadget'
import TaskFilter from '../components/task/taskFilter'
import AppPagination from '../components/ui/AppPagination'

export default {
  components: { AppPage, AppLoader, AppModal, TheBadget, TaskTable, TaskAdd, TaskFilter, AppPagination },
  setup(){
  
    const store = useStore()
    const loading = ref(false)
    const modal = ref(false)
    const isFilter = ref(false)
    const filter = ref({})

    const stats = ref(['new','inwork','planned','specified','denided','completed' ])

    const tasksAll = computed(() => store.getters['task/tasks'])  

    const tasks = computed(() => store.getters['task/tasks']
    .filter(task => {
      if(filter.value.fio) {
        return task.fio.includes(filter.value.fio)
      }
      return task
    })
    .filter(task => {
      if(filter.value.status) {
        return filter.value.status === task.status
      }
      return task
    })
    .filter(task => {
      if(filter.value.type) {
        return filter.value.type === task.type
      }
      return task
    })
    )  

    const toggleFilter  = () => {
      isFilter.value = !isFilter.value
      if(isFilter) filter.value = {}
    }

    const badgetFilter = (stat) => {
      if(stat === 'all') filter.value.status = ''
      else filter.value.status = stat
    }

    onMounted(async () => {
      loading.value = true
      await store.dispatch('task/loadAll')
      loading.value = false
    })

    return { loading, modal, tasks, tasksAll, stats, isFilter, filter , toggleFilter, badgetFilter }
  }
}  
</script>