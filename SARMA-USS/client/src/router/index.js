import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: () => import('../views/Tasks.vue'),
    meta: {
      layout: 'start'
    }
  },
  {
    path: '/:id',
    name: 'Task',
    component: () => import('../views/Task.vue'),
    meta: {
      layout: 'start'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      layout: 'start'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      layout: 'start'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
