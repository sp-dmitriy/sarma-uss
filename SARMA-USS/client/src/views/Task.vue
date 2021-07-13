<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else-if="task" title="Заявка">
    <app-breadcrumb :breadcrumb="breadcrumb"></app-breadcrumb>

   <div>
    <h1 :class="['text-center', className]">Заявка # {{ route.params.id }}</h1>  
    <table class="table mt-3 w-50 m-auto">
      <tbody>
        <tr>
          <th>Заявитель</th>
          <td>{{task.fio}}</td>  
        </tr>
        <tr>
          <th>Срочность</th>
          <td>{{showPriority(task.priority)}}</td>    
        </tr>
        <tr>
          <th>Тип заявки</th>
          <td>{{showType(task.type)}}</td>    
        </tr>
        <tr>
          <th>Описание</th>
          <td>{{task.description}}</td>    
        </tr>
        <tr>
          <th>Дата создания</th>
          <td>{{task.createdAt}}</td>    
        </tr>
        <tr>
          <th>Статус</th>
          <td><app-status :type="task.status"></app-status></td>    
        </tr>
        <tr class="table-success">
          <th>Принял в работу</th>
          <td>{{task.admin}}</td>    
        </tr>
        <tr class="table-success">
          <th>Комментарий</th>
          <td>{{task.answer}}</td>    
        </tr>
        <tr class="table-success">
          <th>Принята в работу</th>
          <td>{{task.updatedAt}}</td>    
        </tr>
        <tr class="table-success">
          <th>Закрыта</th>
          <td>{{task.closedAt}}</td>    
        </tr>  
      </tbody>
    </table>
  </div>

  <div class="mt-5 text-center">
    <button type="button" style="width:150px;" class="btn btn-secondary" @click="back">Назад к списку</button>&nbsp;
    <button type="button" style="width:150px;" class="btn btn-warning" v-if="task.status === 'new'" @click="inwork">Взять в работу</button>&nbsp;
    <button type="button" style="width:150px;" class="btn btn-danger" @click="remove"><font-awesome-icon icon="trash-alt" />&nbsp;Удалить</button>&nbsp;
  </div>  

  </app-page>
  <h3 v-else class="text-center mt-5">
    Заявки с ID={{ route.params.id }}  нет 
  </h3>
</template>

<script>
import {useStore} from 'vuex'
import {ref,onMounted, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import AppBreadcrumb from '../components/ui/AppBreadcrumb'
import {showType} from '../utils/showType'
import {showPriority} from '../utils/showPriority'
import AppStatus from '../components/ui/AppStatus'

import { useSwal } from "../utils/useSwal"

export default({
  components: {AppPage, AppLoader, AppBreadcrumb, AppStatus},
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const Swal = useSwal()    

    const loading = ref(true)
    const task = ref({})
    const className = ref()

    const classesMap = {
      new: 'text-danger',
      inwork: 'text-warning',
      planned: 'text-primary',
      specified: 'text-info',
      denided: 'text-secondary',
      completed: 'text-success'
    }

    const breadcrumb = [
      {url: '/',title: 'Список заявок'},
      {url: '',title:  'Заявка #' + route.params.id},
    ]

    onMounted(async () => {
      loading.value  = true
      task.value = await store.dispatch('task/loadOne', route.params.id)
      className.value = classesMap[task.value.status]
      loading.value  = false
    })

    const back = () => router.push('/') 
    const del = () => router.push('/')

    const inwork = async () => {
      const data = {...task.value, status: 'inwork', id : route.params.id }
      await store.dispatch('task/update', data)
      router.push('/')
    }

    const remove = () => 
      Swal.fire({
        title: 'Внимание!',
        text: 'Данная запись будет удалена',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Да, удалить',
        confirmButtonColor: 'red',
        cancelButtonText: 'Отменить',
        showCloseButton: true
      }).then(async (result) => {
          if(result.value) {
            await store.dispatch('task/remove', route.params.id)
            router.push('/')
          } 
        })

    return { loading, task, route, breadcrumb, showType, showPriority, back, inwork, remove, className }        
  }
})
</script>
