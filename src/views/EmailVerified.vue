<script setup lang="ts">
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref } from 'vue'
import router from '@/router'
const senha = ref('')
const email = ref('')
const senhaNovamente = ref('')
const erro = ref('')
const isDone = ref(false)
const playMatch = ref(true)
const loading = ref(false)
const valid = ref(false)

const save = ref(false)

<<<<<<< HEAD
const verificar = () => {
=======
const verificar = async () => {
  erro.value = ''
  loading.value = true
  try {
    router.push('/esqueceu')
  } catch (error) {
    erro.value = (error as Error).message
    console.log(erro)
  }

  loading.value = false
}

const salvar = () => {
  erro.value = ''

  if (!senha.value || !senhaNovamente.value || senha.value !== senhaNovamente.value) {
    if (senha.value !== senhaNovamente.value) {
      erro.value = 'As senhas não estão iguais'
    }
    valid.value = true
    return
  }

>>>>>>> f8992612ccf0dbdba79d7d5ebf7479e40695148b
  erro.value = ''
  if (
    email.value
  )
  try {
    api.patch('empresa/redefinicao-senha/'+ email.value)
  } catch (error) {
    erro.value = (error as Error).message
    console.log(erro)
  }
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
          <div class="xl:w-[45%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
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
      </div>
    </div>
  </div>
</template>
