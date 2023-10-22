import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cadastro_Cargo from '@/views/Cadastro_Cargo.vue'
import ListaVaga from '@/views/ListaVaga.vue'
import Ranqueamento from '@/views/Ranqueamento.vue'
import Login from '@/views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Cadastro_Cargo',
      name: 'Cadastro_Cargo',
      component: Cadastro_Cargo
    },
    {
      path: '/Vagas',
      name: 'ListaVaga',
      component: ListaVaga
    },
    {
      path: '/Ranking/:id',
      name: 'Ranque',
      component: Ranqueamento,
      props: true
    },
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})

export default router
