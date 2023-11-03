import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Cadastro_Cargo from '@/views/Cadastro_Cargo.vue'
import Edicao_vaga from '@/views/Edicao_vaga.vue'
import Redefinir_Senha from '@/views/Redefinir_Senha.vue'
import Cadastro_Empresa from '@/views/Cadastro_Empresa.vue'
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
      name: "home",
      component: ListaVaga
    },
    {
      path: '/Redefinir_Senha',
      name: 'Redefinir_Senha',
      component: Redefinir_Senha
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
      path: '/Ranking/:id',
      name: 'Ranque',
      component: Ranqueamento,
      props: true
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/Edicao_vaga/:id',
      name: 'edicao',
      component: Edicao_vaga,
      props: true
    }
  ]
})

export default router
