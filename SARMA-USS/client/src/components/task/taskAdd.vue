<template>

<form class="row g-3" novalidate @submit.prevent="onSubmit"> 

  <div class="col-md-4">
    <label for="fio" class="form-label">Ф.И.О. заявителя</label>
    <input type="text" class="form-control" :class="[fError ? 'is-invalid': '']" id="fio" v-model="fio" >
    <div class="text-danger" v-if="fError">{{fError}}</div>
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
    <textarea class="form-control" id="description" rows="3" v-model="description"  :class="[dError ? 'is-invalid': '']"></textarea>
    <div class="text-danger" v-if="dError">{{dError}}</div>
  </div>
  <div class="modal-footer m-auto">
    <button type="button" class="btn btn-secondary" @click="$emit('close')">Отменить</button>
    <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Сохранить</button>
  </div>
</form>
</template>

<script>
import {useStore} from 'vuex'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'


export default({
  emits: ['close'],
  setup(_,{emit}) {
    const store = useStore()

    const {isSubmitting, handleSubmit} = useForm()  
    
    const {value: fio, errorMessage: fError, handleBlur: fBlur} = useField('fio',yup.string().trim().required('Введите ФИО заявителя'))
    const {value: description, errorMessage: dError, handleBlur: dBlur} = useField('description',yup.string().trim().required('Описание не может быть пустым'))
    const {value: type} = useField('type')
    const {value: priority} = useField('priority')

    const onSubmit = handleSubmit(values => {
      //alert(JSON.stringify(values, null, 2))
      const createdAt = new Date().toLocaleDateString()
      const task = {...values, createdAt, status: 'new' }
      store.dispatch('task/create',task)
      emit('close')              
    })

    return {
      onSubmit, isSubmitting,
      fio, fError, fBlur,
      description, dError, dBlur,
      type, priority
    }
  },
})
</script>
