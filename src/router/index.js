import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import Authentication from '@/views/Authentication.vue'
import Overview from '@/views/Overview.vue'
import PatientsBoard from '@/views/PatientsBoard.vue'
import DoctorProfile from '@/views/DoctorProfile.vue'
import PatientProfile from '@/views/PatientProfile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/patients',
    name: 'PatientsBoard',
    component: PatientsBoard
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router