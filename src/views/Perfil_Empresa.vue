<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useAuth } from '@/stores/auth'
const id = ref('')
const nome = ref('')
const cnpj = ref('')
const email = ref('')
const descricao = ref('')
const segmento = ref('')
const porte = ref('')
const erro = ref('')
const isChecked = ref(true)
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)
const loading = ref(false)
const loadingC = ref(false)
const valid = ref(false)
const save = ref(false)
const auth = useAuth()
 
async function editar() {
  try {
    const empresaId = auth.getUser.id
    console.log(isChecked.value)
    api.patch('/empresa/editar-empresa/' + empresaId, {
      nome: nome.value,
      email: email.value,
      descricao: descricao.value,
      segmento: segmento.value,
      porte: porte.value,
      tfaAtivado: isChecked.value
    })
    save.value = true
    isDisabled.value = true
  } catch (error) {
    erro.value = (error as Error).message
  }
}
 
const fetchEmpresa = async () => {
  const empresaId = auth.getUser.id
  loading.value = true
  try {
    const response = await api.get('/empresa/' + empresaId)
    id.value = response.data.id
    ;(nome.value = response.data.nome),
      (cnpj.value = response.data.cnpj),
      (email.value = response.data.email),
      (descricao.value = response.data.descricao),
      (segmento.value = response.data.segmento),
      (porte.value = response.data.porte),
      (isChecked.value = response.data.tfaAtivado)
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
}
 
const habilitarInput = () => {
  isDisabled.value = !isDisabled.value
}
 
onMounted(fetchEmpresa)
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
        Informações de Perfil
      </h1>
      <div
        class="xl:w-[80vw] w-[90%] flex items-center flex-col gap-3 p-10 mt-[1rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
      <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between mt-3">
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome
            </span>
            <input
              v-model="nome"
              id="name"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="isDisabled"
              :class="{ 'opacity-70' : isDisabled == true}"
            />
          </div>
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              CNPJ
            </span>
            <input
              v-model="cnpj"
              id="level"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="isDisabled"
              :class="{ 'opacity-70' : isDisabled == true}"
            />
          </div>
        </div>
 
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between mt-3">
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <div class="relative">
              <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Email
              </span>
              <input
                v-model="email"
                id="email"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="isDisabled"
                :class="{ 'opacity-70' : isDisabled == true}"
              />
            </div>
         
            <div class="relative mt-6">
              <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Segmento
              </span>
              <input
                v-model="segmento"
                id="segmento"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="isDisabled"
                :class="{ 'opacity-70' : isDisabled == true}"
              />
            </div>
 
            <div class="relative mt-6">
              <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Porte
              </span>
              <select
                v-model="porte"
                id="porte"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="isDisabled"
              >
                <option value="micro">Micro Empresa</option>
                <option value="pequeno">Pequena Empresa</option>
                <option value="medio">Média Empresa</option>
                <option value="grande">Grande Empresa</option>
              </select>
            </div>
          </div>
 
          <div class="xl:w-[46%] w-full flex flex-col relative mt-2">
              <span
                class="bg-[#FFD600] w-[7rem] absolute bottom-[95%] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Descrição
              </span>
              <textarea
                v-model="descricao"
                id="descricao"
                class="bg-[#084808] h-[95%] w-full p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="isDisabled"
                :class="{ 'opacity-70' : isDisabled == true}"
              ></textarea>
          </div>
        </div>
        <div>
          <label for="toggle" class="flex items-center cursor-pointer mt-4 mb-3">
            <div class="relative">
              <input type="checkbox" id="toggle" class="hidden" v-model="isChecked" :disabled="isDisabled">

              <div :class="{ 'bg-[#084808]': isChecked && !isDisabled, 'bg-[#084808] opacity-70': isDisabled && isChecked, 'bg-gray-400': !isChecked && !isDisabled, 'bg-gray-400 opacity-70' : isDisabled &&! isChecked }" class="toggle__line w-10 h-5 rounded-full shadow-inner"></div>

              <div v-if="isChecked" class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0 transform translate-x-full"></div>
              <div v-else class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 right-6"></div>
            </div>

            <div class="ml-3">Autenticação de dois fatores</div>
          </label>
        </div>
        <div class="fixed bottom-2 right-5">
          <div
            v-if="save"
            class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Dados editados com sucesso!</p>
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
        <div class="w-[90%] flex justify-center flex-col xl:gap-[7rem] xl:flex-row gap-[1rem] items-center top-[2rem]">
          <!-- <div class="w-full flex justify-center"> -->
          <div v-if="playMatch" class=" h-[2.5rem] justify-between text-[#fff]">
            <router-link :to="'/Redefinir_Senha/'">
              <button
                class="bg-[#263001] w-[12rem] rounded-xl"
                type="submit"
                value="Enviar para Busca"
              >
                <p class="text-lg font-bold p-1">Redefinir Senha</p>
              </button>
            </router-link>
          </div>
 
          <!-- <div class="w-full flex justify-center"> -->
          <div v-if="!isDisabled" class="h-[2.5rem] justify-between text-[#fff]">
            <button class="bg-[#263001] w-[10rem] rounded-xl" @click="editar" type="submit">
              <p class="text-lg font-bold p-1">Salvar</p>
            </button>
          </div>

          <div v-else class="h-[2.5rem] justify-between text-[#fff]">
            <button 
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="habilitarInput"
              type="submit"
            >
            <p class="text-lg text-white font-bold p-1">Editar</p>
            </button>
          </div>
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>