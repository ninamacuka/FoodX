import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
import store from '@/store';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "L" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "L" */ '../views/Register.vue')
  },
  {
    path: '/NoviRecept',
    name: 'NoviRecept',
    component: () => import(/* webpackChunkName: "L" */ '../views/NoviRecept.vue')
  },
  {
    path: '/Recepti',
    name: 'Recepti',
    component: () => import(/* webpackChunkName: "L" */ '../views/Recepti.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  console.log('Bio sam na', from.name, 'idem na', to.name, 'a korisnik je', store.currentUser);
  const authenticated = store.currentUser !== null;
  if (!authenticated && to.meta.needsAuth) {
  next('login');
  } else {
  next();
  }
 });
export default router