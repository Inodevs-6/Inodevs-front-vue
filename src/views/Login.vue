<script lang="ts" setup>
import SobreInfo from '@/components/Login/SobreInfo.vue'
import Loader from '@/components/Loaderlogin.vue'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import api from '@/services/api'
import router from '@/router'
import { useAuth } from '@/stores/auth'
const auth = useAuth()
const email = ref()
const senha = ref()
const codigo = ref()
const erro = ref()
const errorCode = ref()
const loading = ref(false)
const loadingCode = ref(false)
const modalOpened = ref(false)
const reenviado = ref(false)

const Logando = async () => {
  erro.value = ''
  loading.value = true
  let continuar = false

  try {
    const response = await api.post('/login', {
      username: email.value,
      password: senha.value
    })

    if (response.data.token) {
      auth.setToken(response.data.token)
      auth.setUser(response.data.empresa)
      router.push('/home')

      continuar = false
    } else {
      continuar = true
    }
  } catch (error) {
    console.log((error as Error).message)
    erro.value = "Usuário ou senha inválidos!"
  }

  loading.value = false

  if (continuar) {
    modalOpened.value = true
    try {
      await api.patch('/login/tfaemail/' + email.value)
    } catch (error) {
      console.log((error as Error).message)
      modalOpened.value = false
      erro.value = "Algo deu errado ao enviar o e-mail!"
    }
  }
}

const verificar = async () => {
  errorCode.value = ''
  loadingCode.value = true

  try {
    const response = await api.post('/login/tfaverificar', {
      username: email.value,
      password: senha.value,
      codigo: codigo.value
    })

    if (response.data.token) {
      auth.setToken(response.data.token)
      auth.setUser(response.data.empresa)
      router.push('/home')
    } else {
      console.log('Token não recebido.')
      errorCode.value = "Código inválido!"
    }
  } catch (error) {
    console.log((error as Error).message)
    errorCode.value = "Código inválido!"
  }

  loadingCode.value = false
}

const reenviar = async () => {
  errorCode.value = ''
  reenviado.value = true

  try {
    await api.patch('/login/tfaemail/' + email.value)
  } catch (error) {
    console.log((error as Error).message)
    errorCode.value = "Algo deu errado ao enviar o e-mail!"
    reenviado.value = false
  }
}

const closeModal = () => {
  modalOpened.value = false
  errorCode.value = ''
  codigo.value = ''
  reenviado.value = false
  senha.value = ''
}

</script>

<template>
  <section
    class="w-screen p-5 h-screen flex justify-center items-center overflow-hidden bg-[#2A753D]"
  >
    <div class="bg-[#ffff] p-5 flex flex-row w-[95%] h-[95%] rounded-2xl shadow-xl">
      <SobreInfo />
      <div
        class="xl:w-[50%] w-[100%] h-full bg-[#2A753D] rounded-2xl p-3 flex flex-col items-center gap-7 shadow-md"
      >
        <img alt="Vue logo" class="mt-3" src="/assets/profile.svg" width="120" height="120" />
        <span v-if="erro" class="p-1 text-red-200 bg-red-800 w-[33%] bottom-[24rem] absolute text-center">{{ erro }}</span>
        <div class="relative w-[80%]">
          <span
            class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Email
          </span>
          <input
            v-model="email"
            id="email"
            placeholder="Email"
            class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none rounded-xl text-[#000] relative z-0"
          />
        </div>
        <div class="relative w-[80%]">
          <span
            class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Senha
          </span>
          <input
            v-model="senha"
            id="senha"
            type="password"
            placeholder="Senha"
            class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none rounded-xl text-[#000] relative z-0"
          />
        </div>
        <div class="flex items-start gap-2 flex-col">
          <RouterLink to="/Cadastro_Empresa" class="border-b-4 border-white text-white">
            Ainda não tenho uma conta
          </RouterLink>

          <RouterLink to="/VerificarEmail" class="border-b-4 border-white text-white">
            Esqueci minha senha
          </RouterLink>
        </div>

        <button class="bg-[#273201] w-[10rem] rounded-xl" @click="Logando" type="submit">
          <p v-if="!loading" class="text-lg font-bold p-1 text-white">Logar</p>
          <div class="flex justify-center items-center p-1" v-else><Loader /></div>
        </button>

        
      </div>
    </div>
  </section>

  <!-- Modal de autenticação de dois fatores -->
  <div v-if="modalOpened" id="myModal" class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
    <div class="modal-content bg-white p-10 rounded shadow-md w-[25rem] relative">
      <span id="closeModalBtn" class="close absolute top-1 right-4 text-2xl cursor-pointer" @click="closeModal">&times;</span>
      <h2 class="text-2xl font-bold mb-5">Verificação em duas etapas</h2>
      <p class="mb-2">Aguarde um pouco e verifique o seu e-mail: <span class="font-semibold">{{ email }}</span>.</p>
      <p class="mb-3">O código durará apenas 2 minutos.</p>
      <span v-if="errorCode" class="text-red-700 font-semibold">{{ errorCode }}</span>
      <span v-else>&nbsp;</span>
      <div class="relative w-[100%] mb-12 mt-8">
        <span class="bg-[#FFD600] w-[12rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">Código de Verificação</span>
        <input v-model="codigo" id="email" type="text" placeholder="Entre com o código de verificação" class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none border-2 rounded-xl text-[#000] relative z-0"/>
      </div>
      <div class="flex items-center h-10">
        <div class="flex-1"> 
          <p v-if="!reenviado" class="text-blue-600 cursor-pointer" @click="reenviar">Reenviar Código</p>
          <p v-else>Código reenviado!</p>
        </div>
        <div class="flex-1 text-right"> 
          <button class="bg-[#273201] w-[10rem] rounded-xl" @click="verificar" type="submit">
            <p v-if="!loadingCode" class="text-lg font-bold p-1 text-white">Verificar</p>
            <div v-else class="flex justify-center items-center m-1"><Loader /></div>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>