<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref } from 'vue'
const nome = ref('')
const cnpj = ref('')
const email = ref('')
const descricao = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)
const loading = ref(false)
const loadingC = ref(false)
const loadingH = ref(false)
const loadingA = ref(false)
const valid = ref(false)
const id = ref(0)
const save = ref(false)

// async function salvar() {
//   erro.value = ''
//   try {
//     const empresaId = 1
//     api.patch('/editar/' + empresaId + '/' + id.value, {
//       conhecimentos: conhecimentos.value,
//       habilidades: habilidades.value,
//       atitudes: atitudes.value
//     })
//     save.value = true
//   } catch (error) {
//     erro.value = (error as Error).message
//   }
// }

const habilitarInput = () => {
  isDisabled.value = !isDisabled.value
}
</script>

<template>
  <div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <div v-if="isDone">
        <Alert variant="success" />
      </div>
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
      >
        Perfil
      </h1>
      <div
        class="xl:w-[88vw] w-[90%] flex flex-col gap-8 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-1/2 w-full flex flex-col relative left-[5.5rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome
            </span>
            <input
              v-model="nome"
              id="nome"
              class="bg-[#084808] w-[30rem] h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
          <div class="xl:w-1/2 w-full flex flex-col relative left-[3rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              CNPJ
            </span>
            <input
              v-model="cnpj"
              id="cnpj"
              class="bg-[#084808] w-[30rem] h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
        </div>
        <div class="h-full flex flex-col justify-end items-center">
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] right-[12rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Email
          </span>
          <textarea
            v-if="!loadingC"
            rows="4"
            v-model="email"
            id="email"
            class="h-[3rem] w-[35rem] bg-[#084808] p-3 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] right-[12rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Descrição
          </span>
          <textarea
            v-if="!loadingC"
            rows="4"
            v-model="descricao"
            id="descricao"
            class="h-[10rem] w-[35rem] bg-[#084808] p-3 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
        </div>
        <div class="w-full flex justify-center">
            <div v-if="playMatch" class="w-[15rem] h-[2.5rem] flex justify-between text-[#fff]">
                <button
                    class="bg-[#263001] w-[10rem] rounded-xl"
                    @click="'salvar'"
                    type="submit"
                    value="Enviar para Busca"
                >
                    <p class="text-lg font-bold p-1">Salvar</p>
                </button>
            </div>
        </div>
        <!-- <p v-if="loading">Carregando CHA...</p> -->
        <!-- <div    
            v-if="Play"
            @click="habilitarInput"
            class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center">
                <p v-if="isDisabled" class="font-bold text-base" >Aprimorar</p>
                <p v-else class="font-bold text-base" >Voltar</p>
            </div> -->

        <div class="fixed bottom-2 right-5">
          <div
            v-if="valid"
            class="bg-[#cc0000] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Preencha todos os campos!</p>
          </div>
        </div>

        <div class="fixed bottom-2 right-5">
          <div
            v-if="save"
            class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Vaga salva com sucesso!</p>
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
