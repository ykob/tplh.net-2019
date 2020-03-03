import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

const Home = () => import('./components/views/Home.vue')
const Works = () => import('./components/views/Works.vue')
const WhoIAm = () => import('./components/views/WhoIAm.vue')
const Error404 = () => import('./components/views/Error404.vue')

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/works/:key',
      name: 'works',
      component: Works
    },
    {
      path: '/who-i-am',
      name: 'who-i-am',
      component: WhoIAm
    },
    {
      path: '*',
      name: 'error-404',
      component: Error404
    },
  ]
})
