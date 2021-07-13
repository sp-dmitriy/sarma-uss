<template>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li v-for="(b,idx) in breadcrumb" :key=idx class="breadcrumb-item active">
      <router-link v-if="b.url !== ''" :to="b.url">{{b.title}}</router-link>
      <span v-else>{{b.title}}</span>
    </li>
  </ol>
</nav>
</template>

<script>
export default {
  props: ['breadcrumb']
}
</script>