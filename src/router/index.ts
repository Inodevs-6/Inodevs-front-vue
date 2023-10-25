import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Cadastro_Cargo from '@/views/Cadastro_Cargo.vue'
import Edicao_vaga from '@/views/Edicao_vaga.vue'
import ListaVaga from '@/views/ListaVaga.vue'
import Ranqueamento from '@/views/Ranqueamento.vue'
import Login from '@/views/Login.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Cadastro_Cargo',
      name: 'Cadastro_Cargo',
      component: Cadastro_Cargo
    },
    {
      path: '/home',
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
      path: '/Edicao_vaga/:id',
      name: 'edicao',
      component: Edicao_vaga,
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
