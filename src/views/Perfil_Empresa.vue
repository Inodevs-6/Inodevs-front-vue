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
    api.patch('/empresa/editar-empresa/' + empresaId, {
      nome: nome.value,
      email: email.value,
      descricao: descricao.value,
      segmento: segmento.value,
      porte: porte.value
    })
    sucesso()
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
      (porte.value = response.data.porte)
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
}

async function sucesso() {
  save.value = true
  setTimeout(() => {
    router.push('/home')
  }, 2000)
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
        Perfil
      </h1>
      <div
        class="xl:w-[80vw] w-[90%] flex items-center flex-col gap-3 p-4 mt-[1rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-1/2 w-full flex flex-col relative top-[0.7rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome
            </span>
            <input
              v-model="nome"
              id="nome"
              :disabled="isDisabled"
              class="bg-[#084808] w-[30rem] h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
          <div class="xl:w-1/2 w-full flex flex-col relative left-[3rem] top-[0.7rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              CNPJ
            </span>
            <input
              v-model="cnpj"
              id="cnpj"
              disabled
              class="bg-[#084808] w-[30rem] h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
        </div>
        <div class="flex flex-col items-center top-[0.7rem]">
          <span
            class="bg-[#FFD600] w-[7rem] relative top-[0.7rem] right-[28.2rem] font-semibold rounded-lg text-center z-10"
          >
            Email
          </span>
          <textarea
            v-if="!loadingC"
            rows="4"
            v-model="email"
            :disabled="isDisabled"
            id="email"
            class="h-[3rem] w-[65.8rem] bg-[#084808] p-3 shadow-xl rounded-xl text-white"
          >
          </textarea>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[0.7rem] right-[27rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Descrição
          </span>
          <textarea
            v-if="!loadingC"
            rows="4"
            v-model="descricao"
            :disabled="isDisabled"
            id="descricao"
            class="h-[10rem] w-[65.8rem] bg-[#084808] p-3 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
        </div>
        <div class="flex flex-col items-center top-[0.7rem]">
          <span
            class="bg-[#FFD600] w-[7rem] relative top-[0.7rem] right-[28.2rem] font-semibold rounded-lg text-center z-10"
          >
            Segmento
          </span>
          <textarea
            v-if="!loadingC"
            rows="4"
            v-model="segmento"
            :disabled="isDisabled"
            id="email"
            class="h-[3rem] w-[65.8rem] bg-[#084808] p-3 shadow-xl rounded-xl text-white"
          >
          </textarea>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[0.7rem] right-[27rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Porte
          </span>
          <select
            v-model="porte"
            id="porte"
            class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            :disabled="isDisabled"
          >
            <option selected>
              {{ porte }}
            </option>
            <option value="micro">Micro Empresa</option>
            <option value="pequeno">Pequena Empresa</option>
            <option value="médio">Média Empresa</option>
            <option value="grande">Grande Empresa</option>
          </select>
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
        <div class="w-[90%] flex justify-center flex-col gap-[7rem] xl:flex-row top-[2rem]">
          <!-- <div class="w-full flex justify-center"> -->
          <div v-if="playMatch" class="w-[11rem] h-[2.5rem] justify-between text-[#fff]">
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
          <div v-if="!isDisabled" class="w-[15rem] h-[2.5rem] justify-between text-[#fff]">
            <button class="bg-[#263001] w-[10rem] rounded-xl" @click="editar" type="submit">
              <p class="text-lg font-bold p-1">Salvar</p>
            </button>
          </div>

          <button
            v-else
            class="bg-[#263001] w-[10rem] rounded-xl"
            @click="habilitarInput"
            type="submit"
          >
            <p class="text-lg text-white font-bold p-1">Editar</p>
          </button>
          <!-- </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
