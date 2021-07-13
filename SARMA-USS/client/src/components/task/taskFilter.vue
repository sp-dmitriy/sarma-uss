<template>
  <form class="row g-3 mt-3"> 

  <div class="col-md-3">
    <input type="text" class="form-control" placeholder="Ф.И.О. заявителя" v-model="fio">
  </div>

  <div class="col-md-3">
    <select class="form-select" aria-label="Default select example" v-model="type">
      <option value="" disabled>Тип заявки</option>
      <option value="1">Проблема с ПК</option>
      <option value="2">Проблема с 1С</option>
      <option value="3">Проблема с принтером</option>
      <option value="4">Проблема с телефоном</option>
      <option value="5">Оснащение</option>
      <option value="6">Другое</option>
    </select>
  </div>

  <div class="col-md-3">
    <select class="form-select" aria-label="Default select example" v-model="status">
      <option value="" disabled selected>Статус заявки</option>
      <option value="">Все</option>
      <option value="new">Новая</option>
      <option value="inwork">В работе</option>
      <option value="planned">Запланирована</option>
      <option value="specified">Уточняется</option>
      <option value="denided">Отказана</option>
      <option value="completed">Выполнена</option>
    </select>
  </div>

  <div class="col-md-3">
    <select class="form-select" aria-label="Default select example" v-model="admin">
      <option value="" disabled selected>Ответственный</option>
      <option value="specified">Коротких Алексей</option>
      <option value="inwork">Рогозинский Высилий</option>
      <option value="planned">Сопп Дмитрий</option>
       <option value="new">Чубукин Алексей</option>  
    </select>
  </div>

</form> 
</template>

<script>
import {ref,watch} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, {emit} ){
    console.log()
    const fio = ref('')
    const type = ref('')
    const admin = ref('')
    const status = ref('')
 
    watch([fio,type, status, admin ], values => {
      emit('update:modelValue',{
        fio: values[0],
        type: values[1],
        status: values[2],
        admin: values[3]
      })
    })

    return {
      fio, type, status, admin
    }
  }
}
</script>