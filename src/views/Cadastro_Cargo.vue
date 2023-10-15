<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import ia from '../services/ia'
import { ref } from 'vue'
const name = ref('')
const level = ref('')
const conhecimentos = ref('')
const habilidades = ref('')
const atitudes = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const Play = ref(false)
const playMatch = ref(true)
const loading = ref(false)
const matching = ref(false)
const scrapping = ref(false)
const valid = ref(false)

async function editar() {
  try {
    await api.post('/vaga', {
      nome: name.value,
      nivel: level.value,
      conhecimentos: conhecimentos.value,
      habilidades: habilidades.value,
      atitudes: atitudes.value
    })
    isDone.value = true
  } catch (err) {
    erro.value = (err as Error).message
  }
}

async function match() {
  try {
    played()
    scrapping.value = true
    matching.value = false
    await ia.post('/scrap')
    scrapping.value = false
    await ia.post('/match', {
      cargo: name.value.replace(' ', ''),
      nivel: level.value.replace(' ', '')
    })
    matching.value = true
    played()
  } catch (err) {
    erro.value = (err as Error).message
  }
}

async function getResponseChatgpt() {
  loading.value = true
  valid.value = false
  try {
    if (name.value != '' && level.value != '') {
      played()
      const response = (
        await ia.post('/chat', {
          cargo: name.value.replace(' ', ''),
          nivel: level.value.replace(' ', '')
        })
      ).data
      for (let i = 0; i < response.descricao.Conhecimentos.length; i++) {
        conhecimentos.value += response.descricao.Conhecimentos[i] + '\n'
      }
      for (let i = 0; i < response.descricao.Habilidades.length; i++) {
        habilidades.value += response.descricao.Habilidades[i] + '\n'
      }
      for (let i = 0; i < response.descricao.Atitudes.length; i++) {
        atitudes.value += response.descricao.Atitudes[i] + '\n'
      }
      habilitarInput()
      playMatch.value = true
    } else {
      valid.value = true
    }
  } catch (err) {
    erro.value = (err as Error).message
  }
  loading.value = false
}

const habilitarInput = () => {
  isDisabled.value = !isDisabled.value
}

const played = () => {
  Play.value = true
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
        Cadastro de Cargo
      </h1>
      <div
        class="xl:w-[88vw] w-[90%] flex flex-col gap-8 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-1/3 w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome da Vaga
            </span>
            <input
              v-model="name"
              id="name"
              placeholder="Nome da Vaga"
              class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
          <div class="xl:w-1/3 w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nível
            </span>
            <input
              v-model="level"
              id="level"
              placeholder="Nível da Vaga"
              class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
        </div>
        <div class="h-full flex flex-col justify-between">
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Conhecimentos
          </span>
          <textarea
            v-if="!loading"
            rows="4"
            v-model="conhecimentos"
            id="conhecimentos"
            placeholder="Descrição de conhecimentos será gerada"
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
          >
          </textarea>
          <button
            v-if="!loading"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <div
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl"
            v-else
          >
            <Loader />
          </div>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Habilidades
          </span>
          <textarea
            v-if="!loading"
            rows="4"
            v-model="habilidades"
            id="habilidades"
            placeholder="Descrição de habilidade será gerada..."
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
          >
          </textarea>
          <button
            v-if="!loading"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <div
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl"
            v-else
          >
            <Loader />
          </div>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Atitudes
          </span>
          <textarea
            v-if="!loading"
            rows="4"
            v-model="atitudes"
            id="atitudes"
            placeholder="Descrição de atitude será gerada..."
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
          >
          </textarea>
          <button
            v-if="!loading"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <div
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl"
            v-else
          >
            <Loader />
          </div>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Comentário
          </span>
          <textarea
            v-if="!loading"
            rows="4"
            v-model="conhecimentos"
            id="conhecimentos"
            placeholder="Descrição de conhecimentos será gerada"
            class="h-[7rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
          >
          </textarea>
          <div
            v-if="!Play"
            @click="getResponseChatgpt()"
            class="bg-black cursor-pointer absolute top-[5.5rem] right-12 xl:right-[5rem] rounded-full shadow-md xl:p-5 p-2 flex justify-center xl:h-[3.7rem] h-[2rem]"
          >
            <div class="xl:flex hidden">
              <img src="/assets/play.svg" width="20" height="20" alt="" srcset="" />
            </div>
            <div class="flex xl:hidden">
              <img src="/assets/play.svg" width="14" height="14" alt="" srcset="" />
            </div>
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
        <div class="w-full flex justify-center">
          <div v-if="playMatch" class="w-[60%] flex justify-between text-[#fff]">
            <!-- <button class="bg-[#263001] w-[15rem] rounded-xl" @click="editar" type="submit" value="Editar" >
                <p class="text-lg font-bold p-1">
                  Editar
                </p>
              </button> -->

            <button
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="match"
              type="submit"
              value="Enviar para Busca"
            >
              <p class="text-lg font-bold p-1">Salvar</p>
            </button>

            <button
              class="bg-[#263001] w-[16rem] rounded-xl"
              @click="match"
              type="submit"
              value="Enviar para Busca"
            >
              <p class="text-lg font-bold p-1">Salvar e Buscar Candidatos</p>
            </button>
          </div>
        </div>
        <div v-if="scrapping" class="fixed bottom-2 right-5">
          <button
            class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Realizando Busca de Canadidatos...</p>
          </button>
        </div>

        <div class="fixed bottom-2 right-5">
          <div
            v-if="matching"
            class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Match de Candidatos Finalizado!</p>
          </div>
        </div>

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
