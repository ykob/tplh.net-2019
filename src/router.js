import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

import Home from './views/Home.vue';
import Works from './views/Works.vue';
import WhoIAm from './views/WhoIAm.vue';
import Error404 from './views/Error404.vue';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
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
    }
  ]
});

router.afterEach(to => {
  /* global gtag */
  gtag('config', 'G-NE55RESCLQ', { page_path: to.path });
});

export default router;
