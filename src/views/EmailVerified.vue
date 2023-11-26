<script setup lang="ts">
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref } from 'vue'
import router from '@/router'
const email = ref('')
const erro = ref('')
const errorCode = ref("")
const modalOpened = ref(false)
const codigo = ref("")
const isDone = ref(false)
const loadingCode = ref(false)
const playMatch = ref(true)
const reenviado = ref(false)
const codeverifed = ref(false)
const senha = ref('')
const senhaNovamente = ref("")

const verificar = async () => {
  errorCode.value = ''
  // reenviado.value = true

  try {
    await api.patch('/empresa/redefinicao-senha/' + email.value)
    sucesso()
  } catch (error) {
    console.log((error as Error).message)
    errorCode.value = "Algo deu errado ao enviar o e-mail!"
  }
}

// const redefinir = async () => {
//   errorCode.value = ''
// if (!senha.value || !senhaNovamente.value || senha.value !== senhaNovamente.value) {
//   if (senha.value !== senhaNovamente.value) {
//     errorCode.value = 'As senhas não estão iguais'
//   }
//   return
// }

// errorCode.value = ''
//   api.patch('empresa/redefinir-senha/', {
//     senha: senha.value,
//     // senhaNovamente: senhaNovamente.value
//   }).then(response => {
// console.log(response);
// sucesso();
// }).catch(error => {
//   errorCode.value = (error as Error).message;
// console.error("Erro:", error);
// });
// }

// const verificaCode = async () => {
//   errorCode.value = ''
//   loadingCode.value = true

//   try {
//     const response = await api.post('/empresa/tfaverificar', {
//       id: 3 , 
//       tfaCodigo: codigo.value
//     })
//     codeverifed.value = true
//   } catch (error) {
//     console.log((error as Error).message)
//     errorCode.value = "Código inválido!"
//   }

//   loadingCode.value = false
// }

async function sucesso() {

modalOpened.value = true
setTimeout(() => {
  router.push('/home')
}, 3000)
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
      <h1
        class="text-center font-medium xl:text-3xl text-xl flex w-full h-10 justify-center items-center"
      >
        Digite seu Email
      </h1>
      <p v-if="erro" class="text-red-600 text-lg font-bold">
        {{ erro }}
      </p>
      <div
        class="xl:w-[80vw] h-[30vw] w-[90%] flex flex-col gap-4 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="flex flex-col justify-center pt-4 gap-6 items-center">
          <div class="xl:w-[80%]  flex flex-col relative">
            <span v-if="modalOpened"
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center "
            >
              Email
            </span>
            <span v-else
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10 "
            >
              Email
            </span>
            <input
              v-model="email"
              id="email"
              placeholder="Email"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              type="text"
            />
          </div>
        </div>

        <div class="w-full flex justify-center mt-10">
          <div class="w-[60%] flex justify-center text-[#fff]">
            <button
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="verificar"
              type="submit"
              value="Confirmar"
            >
              <p class="text-lg font-bold p-1">Enviar Email</p>
            </button>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div
            v-if="erro"
            class="bg-[#cc0000] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">{{ erro }}</p>
          </div>
          
        </div>

        <div
          v-if="modalOpened"
          id="myModal"
          class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div
            class="modal-content flex items-center gap-5 justify-center flex-col bg-white p-5 rounded shadow-md w-[30rem] relative"
          >
            <h2 class="text-xl font-bold">Email enviado com Sucesso</h2>
            <span v-if="erro" class="text-red-700 font-semibold">{{ erro }}</span>
            <img src="/assets/sucess.svg" alt="sucess" width="50" />
            <div class="w-full flex justify-center items-center flex-col">
              <h2 class="text-base font-bold">Você será redirecionado para pagina de Login</h2>
              <h2 class="text-base font-bold">Em Instantes receberá o seu Codigo</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
