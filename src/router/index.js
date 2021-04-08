import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import Authentication from '@/views/Authentication.vue'
import Overview from '@/views/Overview.vue'
import PatientsBoard from '@/views/PatientsBoard.vue'
import PatientsTable from '@/views/PatientsTable.vue'
import DoctorProfile from '@/views/DoctorProfile.vue'
import PatientProfile from '@/views/PatientProfile'

Vue.use(VueRouter)

const routes = [
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
    path: '/patientstable',
    name: 'PatientsTable',
    component: PatientsTable
  },
  {
    path: '/patient',
    name: 'PatientProfile',
    component: PatientProfile
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/profile',
    name: 'DoctorProfile',
    component: DoctorProfile
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router