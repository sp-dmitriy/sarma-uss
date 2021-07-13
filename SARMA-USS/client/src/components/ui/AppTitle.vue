<template>
  <div class="row justify-content-between mb-5">
    <div class="col">
    </div>
    <div class="col text-center">
       <h2 class="text-center mt-3 mb-3">{{title}}</h2> 
    </div>
     <div class="col align-self-center">
      <button type="button" class="btn btn-primary" @click="$emit('add')">Добавить</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['add'],
  props: ['title']
}
</script>