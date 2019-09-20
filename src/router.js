import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/views/Home.vue'
import Works from './components/views/Works.vue'
import About from './components/views/About.vue'
import Contact from './components/views/Contact.vue'

Vue.use(Router)

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
  ]
})
