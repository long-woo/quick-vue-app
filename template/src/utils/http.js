import Vue from 'vue'
import Axios from 'axios'

// 配置axios
Axios.defaults.baseURL = process.env.baseURL
Axios.defaults.timeout = 5000

// 请求拦截器
Axios.interceptors.request.use(config => {
  const params = Object.assign({

  }, config.params)

  config.params = params
  Vue.nprogress.start()

  if (config.method === 'post') {

  }

  return config
}, error => {
  Vue.nprogress.done()

  return error
})

// 相应拦截器
Axios.interceptors.response.use(resopnse => {
  Vue.nprogress.done()

  return resopnse.data
}, error => {
  Vue.nprogress.done()

  return error
})

export default Axios
