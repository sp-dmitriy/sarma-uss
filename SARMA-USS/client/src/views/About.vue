<template>
  <app-page title="Инструкция">
    <app-breadcrumb :breadcrumb="breadcrumb"></app-breadcrumb>
    <h1 class=" text-center">Инструкция</h1>  
    <p>
      Далеко-далеко за словесными горами, в стране гласных и согласных живут рыбные тексты. О знаках снова его безопасную власти. Продолжил, вдали за своих, страну там грамматики от всех деревни бросил сих путь имеет рекламных оксмокс власти. До грустный назад парадигматическая, силуэт, пор оксмокс вопроса реторический рукопись решила точках путь несколько языком жизни гор повстречался.
    </p>
  </app-page>  
</template>

<script>

import AppPage from '../components/ui/AppPage'
import AppBreadcrumb from '../components/ui/AppBreadcrumb'

export default({
  components: {AppPage,  AppBreadcrumb},
  setup() {
    const breadcrumb = [
      {url: '/',title: 'Список заявок'},
      {url: '',title:  'Инструкция'},
    ]

    return { breadcrumb}        
  }
})
</script>
