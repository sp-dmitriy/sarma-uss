<template>
  <transition name="modal">
    <div class="modal-mask">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" v-if="title">{{ title }}</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
            </div>
            <div class="modal-body">
              <slot />
            </div>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ['close'],
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s ease;
}
</style>