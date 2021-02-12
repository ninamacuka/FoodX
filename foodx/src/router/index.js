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
  },
  {
    path: '/recept/:id',
    name: 'Recept',
    component: () => import(/* webpackChunkName: "login" */ '../views/Recept.vue'),
    meta:{
      needsAuth:true
    }  
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "login" */ '../views/Admin.vue'),
    meta:{
      needsAuth:true
    }  
  },
  {
    path: '/profil/:email',
    name: 'Profil',
    component: () => import(/* webpackChunkName: "login" */ '../views/Profil.vue'),
    meta:{
      needsAuth:true
    }  
  },
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