import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Dashboard from '@/views/Dashboard.vue'
import PatientProfile from '@/views/PatientProfile'
import ThreeView from '@/views/ThreeView'
import ThreeViewSimple from '@/views/ThreeViewSimple'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/patient',
    name: 'PatientProfile',
    component: PatientProfile
  },
  {
    path: '/three',
    name: 'ThreeView',
    component: ThreeView
  },
  {
    path: '/threesimple',
    name: 'ThreeViewSimple',
    component: ThreeViewSimple
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router