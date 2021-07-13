<template>
   <slot />
</template>

<script>
export default {
  props: { 
    title: {
      type: String,
      required: true
    }
  },
  setup(props){
    document.title = `${props.title} | Uses Support System`
  }
}
</script>