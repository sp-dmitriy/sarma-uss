<template>
  <header>
    <div class="d-flex flex-column flex-md-row align-items-center pb-3 border-bottom">
      <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
        <img alt="Vue logo" src="../assets/logo1.png">
      </a>
      <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <router-link class="nav-link" to="/about" >Инструкция</router-link>
        <router-link class="nav-link" to="/login">Войти</router-link>
      </nav>
    </div>
  </header>
</template>