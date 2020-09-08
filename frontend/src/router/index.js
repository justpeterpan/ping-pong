import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Table from '../components/Table.vue';
import PlayerDetail from '../components/PlayerDetail.vue';
import MatchDetail from '../components/MatchDetail.vue';
import Signin from '../components/Signin.vue';
import store from '../store/index';
import MatchForm from '@/components/MatchForm';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/table',
    name: 'Table',
    component: Table,
  },
  {
    path: '/player/:id',
    name: 'player',
    component: PlayerDetail,
    props: true,
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
  },
  {
    path: '/match/form',
    name: 'matchform',
    component: MatchForm,
  },
  {
    path: '/match/:id',
    name: 'match',
    component: MatchDetail,
    props: true,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const waitForStorageTobeReady = async (to, from, next) => {
  await store.restored;
  const { state } = store;

  if (!state.player.isLoggedIn && to.path !== '/signin') next('/signin');
  else next();
};
router.beforeEach(waitForStorageTobeReady);

export default router;
