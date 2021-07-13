<template>
  <app-page title="Логин ">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4 text-center mt-5">
          <form @submit.prevent="onSubmit">
            <h1 class="h3 mb-3 fw-normal">Вход в систему</h1>

            <div class="form-floating mb-2">
              <input type="email" class="form-control"  id="email"  placeholder="name@example.com" :class="[eError ? 'is-invalid': '']"  v-model="email" />
              <label for="email">Email</label>
            </div>
            
            <div class="form-floating mb-2">
              <input type="password" class="form-control" id="password" placeholder="Пароль" :class="[pError ? 'is-invalid': '']"  v-model="password" />
              <label for="password">Пароль</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
  </app-page>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage.vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'

export default {
  components: {AppPage},
  setup(){
    const router = useRouter()
    const store = useStore()
    const {isSubmitting, handleSubmit} = useForm()  
 
    const {value: email, errorMessage: eError, handlerBlur:eBlur} = useField(
      'email',
      yup
        .string()
        .trim()
        .required('Введиите Email')
        .email('Не корректрый  email')
    )
    const {value: password, errorMessage: pError, handlerBlur:pBlur} = useField(
      'password',
      yup
        .string()
        .required('Введите пароль') 
    )


  const onSubmit = handleSubmit(async values => {
    try{
      await store.dispatch('auth/login', values)     
      router.push('/')
    }catch(e) {
      console.log(e.message)
    }
  })
  
    return {onSubmit, email, eError, password, pError}
  }
}
</script>