<template>
<!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <!-- <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;"> -->

  <div class="container-fluid">
    <a class="navbar-brand" href="/">Нерпёнок</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="#" class="nav-link"><font-awesome-icon icon="swimmer" /> Расписание</router-link>
        <router-link to="/client" class="nav-link"><font-awesome-icon icon="baby" /> Клиенты</router-link>
        <router-link to="#" class="nav-link"><font-awesome-icon icon="user-tie" /> Инструкторы</router-link>
      </div>
    </div>
    <div class="d-flex">
      <router-link to="#" class="btn btn-primary">Выйти</router-link>
    </div>
  </div>
</nav>
</template>

<script>
export default {

}
</script>