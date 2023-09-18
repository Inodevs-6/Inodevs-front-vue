<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/alert/Alert.vue'
import axios from 'axios'
import { ref } from 'vue'
const name = ref('')
const level = ref('')
const desc_hab = ref('')
const desc_ati = ref('')
const desc_cap = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const Play = ref(false)
const loading = ref(false)

async function cadatrar() {
  try {
    await axios.post('https://localhost:8080/descricaoCargo', {
      desc_vaga: name.value,
      desc_nivel: level.value,
      desc_habilidades: desc_hab.value,
      desc_atitudes: desc_ati.value,
      desc_capacidades: desc_cap.value
    })
    isDone.value = false
    console.log(
      `${name.value} + ${level.value} + ${desc_hab.value} + ${desc_ati.value} + ${desc_cap.value}`
    )
  } catch (err) {
    erro.value = (err as Error).message
  }
  console.log('passei')
}

async function getResponseChatgpt(name: String, level: String) {
  loading.value = true
  try {
    await axios.get(`https://jsonplaceholder.typicode.com/chatgp/${name} ${level}`, {})
    played()
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
        Cadastro Cargo
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
              Nome
            </span>
            <input
              v-model="name"
              id="name"
              placeholder="Nome do Cargo"
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
              placeholder="Nível do Cargo"
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
              v-if="!loading"
              rows="4"
              v-model="desc_hab"
              id="desc_hab"
              :disabled="isDisabled"
              placeholder="Descrição de habilidade será gerada..."
              class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
            >
            </textarea>
            <div
            v-else
            class="h-[10rem] bg-[#2A753D] p-4 items-center justify-center focus:outline-none flex resize-none shadow-xl rounded-xl">
            <Loader/>  
          </div>
            <div
              v-if="Play"
              @click="habilitarInput"
              class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center"
            >
              <p v-if="isDisabled" class="font-bold text-base">Aprimorar</p>
              <p v-else class="font-bold text-base">Voltar</p>
            </div>

            <textarea
              v-if="!loading"
              rows="4"
              v-model="desc_ati"
              id="desc_ati"
              :disabled="isDisabled"
              placeholder="Descrição de atitude será gerada..."
              class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
            >
            </textarea>
            <div
            v-else
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl">
            <Loader/>  
          </div>
            <div
              v-if="Play"
              @click="habilitarInput"
              class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center"
            >
              <p v-if="isDisabled" class="font-bold text-base">Aprimorar</p>
              <p v-else class="font-bold text-base">Voltar</p>
            </div>
            <textarea
              v-if="!loading"
              rows="4"
              v-model="desc_cap"
              id="desc_cap"
              :disabled="isDisabled"
              placeholder="sua descrição será gerada"
              class="h-[10rem] text-xs xl:text-base bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl"
            >
            </textarea>
            <div
            v-else
            class="h-[10rem] bg-[#2A753D] items-center justify-center p-4 focus:outline-none flex resize-none shadow-xl rounded-xl">
            <Loader/>   
          </div>
            <div
              v-if="Play"
              @click="habilitarInput"
              class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center"
            >
              <p v-if="isDisabled" class="font-bold text-base">Aprimorar</p>
              <p v-else class="font-bold text-base">Voltar</p>
            </div>
            <div
              @click="getResponseChatgpt(name, level)"
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
        </div>
        <div class="w-full flex justify-center text-[#fff]">
          <button
            v-if="Play"
            class="bg-[#263001] w-[20rem] rounded-xl"
            @click="cadatrar"
            type="submit"
            value="Cadastrar"
          >
            <p class="text-xl font-bold p-1">Cadastrar</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
