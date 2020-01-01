import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import Home from './components/views/Home.vue'
import Works from './components/views/Works.vue'
import WhoIAm from './components/views/WhoIAm.vue'

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
  ]
})
