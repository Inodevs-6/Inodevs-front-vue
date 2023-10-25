import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Cadastro_Cargo from '@/views/Cadastro_Cargo.vue'
import Cadastro_Empresa from '@/views/Cadastro_Empresa.vue'
import ListaVaga from '@/views/ListaVaga.vue'
import Ranqueamento from '@/views/Ranqueamento.vue'
import Perfil_Empresa from '@/views/Perfil_Empresa.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Cadastro_Cargo',
      name: 'Cadastro_Cargo',
      component: Cadastro_Cargo
    },
    {
      path: '/Cadastro_Empresa',
      name: 'Cadastro_Empresa',
      component: Cadastro_Empresa
    },
    {
      path: '/Vagas',
      name: 'ListaVaga',
      component: ListaVaga
    },
    {
      path: '/Perfil',
      name: 'Perfil_Empresa',
      component: Perfil_Empresa
    },
    {
      path: '/Ranking/:id',
      name: 'Ranque',
      component: Ranqueamento,
      props: true
    }
  ]
})

export default router
