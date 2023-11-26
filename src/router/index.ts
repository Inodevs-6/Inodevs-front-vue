import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Cadastro_Cargo from '@/views/Cadastro_Cargo.vue'
import Edicao_vaga from '@/views/Edicao_vaga.vue'
import Redefinir_Senha from '@/views/Redefinir_Senha.vue'
import Cadastro_Empresa from '@/views/Cadastro_Empresa.vue'
import ListaVaga from '@/views/ListaVaga.vue'
import Ranqueamento from '@/views/Ranqueamento.vue'
import Login from '@/views/Login.vue'
import Perfil_Empresa from '@/views/Perfil_Empresa.vue'
import LoginRedefinicao from '@/views/LoginRedefinicao.vue'
import Notificacao from '@/views/Notificacao.vue'
import { useAuth } from '@/stores/auth'
import EmailVerified from '@/views/EmailVerified.vue'
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
      name: 'home',
      component: ListaVaga
    },
    {
      path: '/Redefinir_Senha/:id',
      name: 'Redefinir_Senha',
      component: Redefinir_Senha
    },
    {
      path: '/LoginRedefinicao/:id' ,
      name: 'LoginDefinicao',
      component: LoginRedefinicao,
      props: true,
      meta: {
        noauth: true
      }
    },
    {
      path: '/VerificarEmail',
      name: 'verificarEmail',
      component: EmailVerified,
      meta: {
        noauth: true
      }
    },
    {
      path: '/Cadastro_Empresa',
      name: 'Cadastro_Empresa',
      component: Cadastro_Empresa,
      meta: {
        noauth: true
      }
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
    },
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        noauth: true
      }
    },
    {
      path: '/Edicao_vaga/:id',
      name: 'edicao',
      component: Edicao_vaga,
      props: true
    },
    {
      path: '/Notificacao',
      name: 'Notificacao',
      component: Notificacao
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuth()
  const isAuthenticated = await auth.checkToken()

  if (!to.meta?.noauth) {
    if (auth.token && auth.user && isAuthenticated) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    if (to.name == 'login' && auth.token && auth.user && isAuthenticated) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

export default router
