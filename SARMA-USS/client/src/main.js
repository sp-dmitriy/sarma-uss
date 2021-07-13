import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swal from "./utils/useSwal"

import '../node_modules/bootstrap/dist/css/bootstrap.css'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faEdit, faTrashAlt, faEye, faSwimmer, faUser, faBaby, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faEdit , faTrashAlt, faEye, faSwimmer, faUser, faBaby, faUserTie)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(Swal)
app.use(store).use(router).mount('#app')
