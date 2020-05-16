import Vue from 'vue'
import axios from 'axios'

const { host, origin, pathname } = document.location
const api = host.includes('localhost') ? 'http://localhost:3030' : origin

axios.defaults.baseURL = api
axios.interceptors.response.use(({ data }) => ({ data, error: null }), (error) => {
  console.log(pathname)
  if (error.response && error.response.status === 401 && pathname === '/login') {
    localStorage.clear()
    // document.location.reload()
  }
  return Promise.resolve({ error, data: null })
})

Vue.prototype.$axios = axios
