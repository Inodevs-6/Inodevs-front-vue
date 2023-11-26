<script setup lang="ts">
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref, defineProps } from 'vue'
import { useAuth } from '@/stores/auth'
import router from '@/router'

const senha = ref('')
const codigo = ref('')
const senhaNovamente = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)
const errorCode = ref()
const loadingCode = ref(false)
const modalOpened = ref(true)
const reenviado = ref(false)
const modalOpened1 = ref(false)
const codeverifed = ref(false)
const email = ref("")
const valid = ref(false)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const salvar = () => {
  erro.value = ''

  if (!senha.value || !senhaNovamente.value || senha.value !== senhaNovamente.value) {
    if (senha.value !== senhaNovamente.value) {
      erro.value = 'As senhas não estão iguais'
    }
    valid.value = true
    return
  }

  erro.value = ''
  api
    .patch('empresa/redefinir-senha/' + props.id, {
      senha: senha.value
      // senhaNovamente: senhaNovamente.value
    })
    .then((response) => {
      console.log(response)
      sucesso()
    })
    .catch((error) => {
      erro.value = (error as Error).message
      console.error('Erro:', error)
    })
}


const verificaCode = async () => {
  errorCode.value = ''
  loadingCode.value = true

  try {
    const response = await api.post('/empresa/tfaverificar', {
      id: props.id , 
      tfaCodigo: codigo.value
    })
    codeverifed.value = true
  } catch (error) {
    console.log((error as Error).message)
    errorCode.value = "Código inválido!"
  }

  loadingCode.value = false
}

const habilarreenviar = () => {
  reenviado.value = true
}

const reenviar = async () => {
  errorCode.value = ''


  try {
    await api.patch('/empresa/redefinicao-senha/' + email.value)
    reenviado.value = false
  } catch (error) {
    console.log((error as Error).message)
    errorCode.value = "Algo deu errado ao enviar o e-mail!"
  }
}

const closeModal = () => {
  modalOpened.value = false
  errorCode.value = ''
  codigo.value = ''
  reenviado.value = false
  senha.value = ''
}

async function sucesso() {
  modalOpened1.value = true
  setTimeout(() => {
    router.push('/home')
  }, 3000)
}
</script>

<template>
  <div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <div v-if="isDone">
        <Alert variant="success" />
      </div>

      <div class="w-full flex justify-left mt-5">
        <div v-if="playMatch" class="w-[11rem] h-[2.5rem] justify-between text-[#fff]">
          <router-link to="/">
            <button class="bg-[#263001] w-[12rem] rounded-xl" type="submit" value="Voltar">
              <p class="text-lg font-bold p-1">Voltar</p>
            </button>
          </router-link>
        </div>
      </div>
     <div v-if="modalOpened" id="myModal" class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-20">
    <div class="modal-content bg-white p-10 rounded shadow-md  w-[80%] relative">
      <span id="closeModalBtn" class="close absolute top-1 right-4 text-2xl cursor-pointer" @click="closeModal">&times;</span>
      <h2 class="text-2xl font-bold mb-5">Verificação em duas etapas</h2>
      <p class="mb-3">O código durará apenas 2 minutos.</p>
      <span v-if="errorCode" class="text-red-700 font-semibold">{{ errorCode }}</span>
      <p v-if="senha !== senhaNovamente" class="text-red-600 text-lg font-bold">
        As senhas não estão iguais !
      </p>
      <span v-else>&nbsp;</span>
      <div v-if="!reenviado" class="relative w-[100%] mb-12 mt-8">
        <span class="bg-[#FFD600] w-[12rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">Código de Verificação</span>
        <input v-model="codigo" id="email" type="text" placeholder="Entre com o código de verificação" class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none border-2 rounded-xl text-[#000] relative z-0"/>
      </div>
      <div v-else class="relative w-[100%] mb-12 mt-8">
        <span class="bg-[#FFD600] w-[12rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">Email</span>
        <input v-model="email" id="email" type="text" placeholder="Entre com o seu email" class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none border-2 rounded-xl text-[#000] relative z-0"/>
      </div>
      <div v-if="codeverifed" class="relative w-[100%] mb-12 mt-8">
        <span class="bg-[#FFD600] w-[12rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">Senha</span>
        <input v-model="senhaNovamente" id="senha" type="password" placeholder="Entre com sua nova senha" class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none border-2 rounded-xl text-[#000] relative z-0"/>
      </div>
      <div v-if="codeverifed " class="relative w-[100%] mb-12 mt-8">
        <span class="bg-[#FFD600] w-[12rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">Senha Novamente</span>
        <input v-model="senha" id="senha" type="password" placeholder="Entre com o código de verificação" class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none border-2 rounded-xl text-[#000] relative z-0"/>
      </div>
      <div class="flex items-center h-10">
        <div v-if="!codeverifed && !reenviado" class="w-[30%]" > 
          <p v-if="!reenviado" class="text-blue-600 cursor-pointer" @click="habilarreenviar">Habilitar reenviar Código</p>
          <p v-else>Código reenviado!</p>
        </div>
        <div v-if="reenviado" class="w-[30%]" > 
          <p class="text-blue-600 cursor-pointer" @click="reenviar">Reenviar Código</p>
        </div>
        <div v-if="codeverifed" class="flex-1 text-center"> 
          <button  class="bg-[#273201] w-[10rem] rounded-xl" @click="salvar" type="submit">
            <p v-if="!loadingCode" class="text-lg font-bold p-1 text-white">Redefinir</p>
            <div v-else class="flex justify-center items-center m-1"><Loader /></div>
          </button>
        </div>
        <div v-else class="flex-1 text-right"> 
          <button  class="bg-[#273201] w-[10rem] rounded-xl" @click="verificaCode" type="submit">
            <p v-if="!loadingCode" class="text-lg font-bold p-1 text-white">Veficar</p>
            <div v-else class="flex justify-center items-center m-1"><Loader /></div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
          v-if="modalOpened1"
          id="myModal"
          class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div
            class="modal-content flex items-center gap-5 justify-center flex-col bg-white p-5 rounded shadow-md w-[30rem] relative"
          >
            <h2 class="text-xl font-bold">Senha redefinida com Sucesso</h2>
            <span v-if="erro" class="text-red-700 font-semibold">{{ erro }}</span>
            <img src="/assets/sucess.svg" alt="sucess" width="50" />
            <div class="w-full flex justify-center items-center flex-col">
              <h2 class="text-base font-bold">Você será redirecionado para pagina de Login</h2>
              <h2 class="text-base font-bold">Sua nova senha já pode ser usada</h2>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
