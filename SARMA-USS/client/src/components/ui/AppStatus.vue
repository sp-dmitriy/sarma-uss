<template>
  <span :class="['badge', className]" style="min-width: 107px;">{{text}}</span>
</template>

<script>
import {ref,watch} from 'vue'

export default {
props: {
  type: {
    type: String,
    required: true,
    validators(val){
      return ['new','inwork','planned','specified','denided', 'completed'].include(val)
    }
  }
},
 setup(props) {
   const classesMap = {
    new: 'bg-danger',
    inwork: 'bg-warning',
    planned: 'bg-primary',
    specified: 'bg-info',
    denided: 'bg-dark',
    completed: 'bg-success'
   }

  const textMap = {
    new: 'Новая',
    inwork: 'В работе',
    planned: 'Запланирована',
    specified: 'Уточняется',
    denided: 'Отказана',
    completed: 'Выполнена'
  }

  const className = ref(classesMap[props.type])
  const text = ref(textMap[props.type])

  watch(props, val => {
    className.value = classesMap[val.type]
    text.value = textMap[val.type]
  })
   return {
     className,
     text
   }

 }
}
</script>