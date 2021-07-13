<template>
<form class="row g-3" novalidate @submit.prevent="onSubmit"> 
  <div class="col-md-4">
    <label for="fio" class="form-label">Ф.И.О. заявителя</label>
    <input type="text" class="form-control" :class="[fioError ? 'is-invalid': '']" id="fio" v-model="fio" @blur="fioBlur">
    <div class="text-danger" v-if="fioError">{{fioError}}</div>
  </div>

  <div class="col-md-4">
    <label for="type" class="form-label">Тип заявки</label>
    <select class="form-select" aria-label="Default select example" v-model="type">
      <option value="1">Проблема с ПК</option>
      <option value="2">Проблема с 1С</option>
      <option value="3">Проблема с принтером</option>
      <option value="4">Проблема с телефоном</option>
      <option value="5">Оснащение</option>
      <option value="6">Другое</option>
    </select>
  </div>

  <div class="col-md-4">
    <label for="priority" class="form-label">Срочность</label>
    <select class="form-select" aria-label="Default select example" v-model="priority">
      <option value="1">По возможности</option>
      <option value="2">В течение месяца</option>
      <option value="3">В течение недели</option>
      <option value="4">В течение дня</option>
      <option value="5">Немедленно</option>
    </select>
  </div>

  <div class="mb-3">
    <label for="description" class="form-label">Описание проблемы</label>
    <textarea class="form-control" id="description" rows="3" v-model="description"  :class="[descriptionError ? 'is-invalid': '']" @blur="descriptionBlur"></textarea>
    <div class="text-danger" v-if="descriptionError">{{descriptionError}}</div>
  </div>

  <div class="col-md-4">
    <label for="createdAt" class="form-label">Создана</label>
    <input type="text" class="form-control" id="createdAt" disabled  v-model="createdAt">
  </div>

  <div class="col-md-4">
    <label for="updatedAt" class="form-label">Принята в работу</label>
    <input type="text" class="form-control" id="updatedAt" disabled  v-model="updatedAt">
  </div>

  <div class="col-md-4">
    <label for="closedAt" class="form-label">Выполнена</label>
    <input type="text" class="form-control"  id="closedAt"   v-model="closedAt">
  </div>

  <div class="col-md-4">
    <label for="admin" class="form-label">Исполнитель</label>
    <input type="text" class="form-control" id="admin"  v-model="admin" >
    <div class="text-danger" v-if="adminError">{{adminError}}</div>
  </div>
  <div class="col-md-4">
    <label for="status" class="form-label">Статус</label>
    <select class="form-select" aria-label="Default select example"  v-model="status">
      <option value="new">Новая</option>
      <option value="inwork">В работе</option>
      <option value="planned">Запланирована</option>
      <option value="specified">Уточняется</option>
      <option value="denided">Отказана</option>
      <option value="completed">Выполнена</option>
    </select>
  </div>

  <div class="mb-3">
    <label for="answer" class="form-label">Ответ пользователю</label>
    <textarea class="form-control" id="description" rows="3" v-model="answer"></textarea>
  </div>

  <div class="modal-footer m-auto">
    <button type="button" class="btn btn-secondary" @click="$emit('close')">Отменить</button>
    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Сохранить</button>
  </div>
</form>
</template>

<script>
import {ref,onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export default({
  emits: ['close'],
  props: ['task'],
  setup(props,{emit}) {
    const store = useStore()

    const {isSubmitting, handleSubmit} = useForm({
      initialValues: props.task
    })
    
   
    const {value: fio, errorMessage: fioError, handleBlur: fioBlur} = useField('fio',yup.string().trim().required('Введите ФИО заявителя'))
    const {value: description, errorMessage: descriptionError, handleBlur: descriptionBlur} = useField('description',yup.string().trim().required('Описание не может быть пустым'))
    const {value: admin, errorMessage: adminError, handleBlur: adminBlur} = useField('admin',yup.string().trim().required('Должен быть ответственный'))
    const {value: status} = useField('status')
    const {value: type} = useField('type')
    const {value: priority} = useField('priority')
    const {value: answer} = useField('answer')
    const {value: createdAt} = useField('createdAt')
    const {value: updatedAt} = useField('updatedAt')
    const {value: closedAt} = useField('closedAt')

    const onSubmit = handleSubmit(values => {
      const dateNow = new Date().toLocaleDateString()
      let taskNew = {}
      if(values.status == 'completed') {
        taskNew = {...values, closedAt : dateNow  }
      } 
      else {
        taskNew = {...values, updatedAt : dateNow, closedAt: ''  }
      }
           
      store.dispatch('task/update',taskNew)
      emit('close')              
    })

    return {
      onSubmit, isSubmitting,
      fio, fioError, fioBlur,
      description, descriptionError, descriptionBlur,
      admin, adminError,adminBlur,
      createdAt, updatedAt, closedAt, answer, status,
      type, priority

    }
  },
})
</script>
