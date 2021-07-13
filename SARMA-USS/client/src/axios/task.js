import axios from 'axios'
import router from '../router'

const taskAxios = axios.create({
  baseURL : process.env.VUE_APP_URL
})

// instructorAxios.interceptors.response.use(null, error => {
//   if(error.response.status === 401) {
//     router.push('/auth?message=auth')
//   }
// })

export default taskAxios