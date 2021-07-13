<template>
<div class="wrapper">
	<div class="content">
    <the-navbar></the-navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
	<div class="footer">
    <the-footer></the-footer>
  </div>
</div>
</template>

<script>
import TheNavbar from '../components/TheNavbar'
import TheFooter from '../components/TheFooter'

export default {
  components: {TheNavbar, TheFooter}
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

