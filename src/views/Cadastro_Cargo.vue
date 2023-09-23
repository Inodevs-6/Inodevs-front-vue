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
const loading = ref(false)
const matching = ref(false)
const scrapping = ref(false)

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
    scrapping.value = true
    matching.value = false
    await ia.post('/scrap')
    scrapping.value = false
    await ia.post('/match', {
      cargo: name.value,
      nivel: level.value
    })
    matching.value = true
  } catch (err) {
    erro.value = (err as Error).message
  }
}

async function getResponseChatgpt() {
  loading.value = true;
  try{
    const response = (await ia.post('/chat',{
      cargo: name.value,
      nivel: level.value
    })).data;
    for (let i=0; i < response.descricao.Conhecimentos.length; i++) {
      conhecimentos.value += response.descricao.Conhecimentos[i] + '\n';
    }
    for (let i=0; i < response.descricao.Habilidades.length; i++) {
      habilidades.value += response.descricao.Habilidades[i] + '\n';
    }
    for (let i=0; i < response.descricao.Atitudes.length; i++) {
      atitudes.value += response.descricao.Atitudes[i] + '\n';
    }
    habilitarInput()
    played()
  }catch(err){
    erro.value = (err as Error).message
  }
  // played()
  loading.value = false;
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
        Cadastro de Vaga
      </h1>
      <p class="text-red-700 fixed">{{ erro }}</p>
      <div
        class="xl:w-[88vw] w-[90%] flex flex-col gap-10 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl"
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
              class="bg-[#2b8341e2] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
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
              class="bg-[#2b8341e2] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
        </div>
        <div
          class="w-full rounded-2xl relative px-10 py-7 h-auto overflow-y-visible flex flex-col shadow-md text-white bg-[#2b8341e2]"
        >
          <span
            class="bg-[#FFD600] top-[-0.7rem] w-[7rem] shadow-md rounded-lg text-black font-semibold absolute text-center"
          >
            CHA
          </span>

          <div class="h-full flex flex-col gap-8 justify-between">
            <textarea
              rows="4"
              v-model="conhecimentos"
              id="conhecimentos"
              :disabled="isDisabled"
              placeholder="Descrição de conhecimentos será gerada"
              class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
            >
            </textarea>
            <textarea
              rows="4"
              v-model="habilidades"
              id="habilidades"
              :disabled="isDisabled"
              placeholder="Descrição de habilidade será gerada..."
              class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
            >
            </textarea>
            <textarea
              rows="4"
              v-model="atitudes"
              id="atitudes"
              :disabled="isDisabled"
              placeholder="Descrição de atitude será gerada..."
              class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
            >
            </textarea>
            <div
                @click="getResponseChatgpt()"
                class="bg-black cursor-pointer absolute top-[1rem] right-12 xl:right-[5rem] rounded-full shadow-md xl:p-5 p-2 flex justify-center xl:h-[3.7rem] h-[2rem]"
              >
                <div class="xl:flex hidden">
                  <img src="/assets/play.svg" width="20" height="20" alt="" srcset="" />
                </div>
                <div class="flex xl:hidden">
                  <img src="/assets/play.svg" width="14" height="14" alt="" srcset="" />
                </div>
              </div>
          </div>
          <p v-if="loading">Carregando CHA...</p>
          <!-- <div    
            v-if="Play"
            @click="habilitarInput"
            class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center">
                <p v-if="isDisabled" class="font-bold text-base" >Aprimorar</p>
                <p v-else class="font-bold text-base" >Voltar</p>
            </div> -->
        </div>
        <div v-if="Play" class="w-full flex justify-center text-[#fff]">
          <!-- <button class="bg-[#263001] w-[15rem] rounded-xl" @click="editar" type="submit" value="Editar" >
              <p class="text-lg font-bold p-1">
                Editar
              </p>
            </button> -->
          <button
            class="bg-[#263001] w-[15rem] rounded-xl"
            @click="match"
            type="submit"
            value="Enviar para busca"
          >
            <p class="text-lg font-bold p-1">Buscar Candidatos</p>
          </button>
        </div>
        <button v-if="scrapping" class="bg-[#2A753D] w-[15rem] rounded-xl" type="submit">
          <p class="text-[#fff] text-lg font-bold p-1">Iniciando Busca de Canadidatos.</p>
        </button>
        <button v-if="matching" class="bg-[#2A753D] w-[15rem] rounded-xl" type="submit">
          <p class="text-[#fff] text-lg font-bold p-1">Match de Candidatos Finalizado!.</p>
        </button>
      </div>
    </div>
  </div>
</template>
