<template>
  <span :class="['badge', className]" style="min-width:50px" @click="$emit('changeHandler')">{{num}}</span>&nbsp;
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
  },
  num: {
    type: Number,
    required: true
  }
},
 emits: ['changeHandler'],
 setup(props) {
   const classesMap = {
    new: 'bg-danger',
    inwork: 'bg-warning',
    planned: 'bg-primary',
    specified: 'bg-info',
    denided: 'bg-dark',
    completed: 'bg-success',
    all: 'bg-secondary'
   }
  

  const className = ref(classesMap[props.type])
  

  watch(props, val => {
    className.value = classesMap[val.type]
  })
   return {
     className
   }

 }
}
</script>
<style scoped>
 .badge{
   cursor: pointer;
   
 }
</style>