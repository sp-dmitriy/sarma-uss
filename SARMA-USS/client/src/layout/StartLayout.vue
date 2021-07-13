<template>
<div class="wrapper">
	<div class="content">
    <div class="container py-3">
    <the-header></the-header>
    <router-view></router-view>
  </div> 
  </div>
	<div class="footer">
    <the-footer></the-footer>
  </div>
</div>
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'

export default {
  components: {TheHeader, TheFooter}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
.content {
	min-height: calc(100vh - 60px);
}
</style>

