import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',{{#isSubApp}}
  publicPath: process.env.BASE_URL,{{/isSubApp}}
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 页面拦截 */
  
  next()
})

export default router
