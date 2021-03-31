import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Dashboard from '@/views/Dashboard.vue'
import DoctorProfile from '@/views/DoctorProfile.vue'
import PatientProfile from '@/views/PatientProfile'
import ThreeView from '@/views/ThreeView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
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
    path: '/profile',
    name: 'DoctorProfile',
    component: DoctorProfile
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router