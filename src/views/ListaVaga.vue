<script lang="ts" setup>
interface Vaga {
  nome: string
  nivel: string
  id: number
}
import LabelLista from '@/components/labels/Label-lista.vue'
import OpenMenu from '@/components/menu/OpenMenu.vue'
import LoaderforList from '@/components/LoaderforList.vue'
import api from '@/services/api'
import { onMounted, ref } from 'vue'
import { useAuth } from '@/stores/auth';
const namesearch = ref('')
const erro = ref('')
const isSeach = ref(false)
const loading = ref(true)
const vagas: Vaga = ref([])
const vagas1: Vaga = ref([])
const auth = useAuth()

const SearchName = async () => {
  isSeach.value = true
  loading.value = true
  try {
    const response = await api.get(`/vaga/${namesearch.value}`)
    vagas1.value = response.data
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
  console.log(vagas1.value)
}

const closeSeachname = () => {
  isSeach.value = false
}

const fetchVagas = async () => {
  loading.value = true
  try {
    const empresaId = auth.getUser.id
    const response = await api.get('/vaga/empresa/' + empresaId)
    vagas.value = response.data
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
}

onMounted(fetchVagas)
</script>

<template>
  <div class="bg-white relative flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
      >
        Vagas
      </h1>
      <div class="w-[90%] border-b-[2px] flex flex-row border-black">
        <input
          v-model="namesearch"
          type="text"
          class="w-[90%] pl-5 outline-none hover:hover:bg-[#f7f6f6] rounded-xl"
        />
        <div
          id="search"
          v-if="!isSeach"
          @click="SearchName"
          class="flex justify-center z-20 items-center w-[10%]"
        >
          <img
            alt="search"
            class="hover:bg-[#f7f6f6] cursor-pointer rounded-xl"
            src="/assets/Search.svg"
            width="30"
            height="30"
          />
        </div>
        <div
          id="search"
          v-else
          @click="closeSeachname"
          class="flex justify-center z-20 items-center w-[10%]"
        >
          <img
            alt="search"
            class="hover:bg-[#f7f6f6] cursor-pointer rounded-xl"
            src="/assets/Close.svg"
            width="30"
            height="30"
          />
        </div>
      </div>
      <LabelLista
        name="Vagas"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[8.7rem] left-[9rem] shadow-md rounded-lg text-center z-10"
      />
      <LabelLista
        name="Nível"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[8.7rem] left-[30rem] shadow-md rounded-lg text-center z-10"
      />
      <LabelLista
        name="Editar"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[8.7rem] right-[23rem] shadow-md rounded-lg text-center z-10"
      />
      <LabelLista
        name="Rank"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[8.7rem] right-[7rem] shadow-md rounded-lg text-center z-10"
      />
      <section
        v-if="!isSeach"
        class="xl:w-[88vw] h-[70vh] w-[90%] relative overflow-auto flex flex-col gap-4 p-4 pt-7 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl"
      >
        <div class="items-center flex justify-center mt-[20vh]" v-if="loading">
          <LoaderforList />
        </div>
        <li
          v-else
          v-for="vaga in vagas"
          :key="vaga.id"
          class="h-[3rem] text-white font-bold w-full flex-row flex  items-center rounded-lg bg-[#2A753D]"
        >
          <div class="w-[30%] ml-7">
            <span> {{ vaga.nome }} </span>
          </div>
          <div class=" w-[30%] ml-7">
            <span>{{ vaga.nivel }} </span>
          </div>
          <router-link :to="'/Edicao_vaga/' + vaga.id" class="pl-6 w-[25%] flex justify-center">
            <div class="p-1 rounded-full bg-[#f3f048f9]">
              <img
                alt="Vue logo"
                class="hover:bg-[#f3f048f9] cursor-pointer rounded-xl"
                src="/assets/Edit.svg"
                width="30"
                height="30"
              />
            </div>
          </router-link>
          <router-link :to="'/ranking/' + vaga.id" class="pl-6 w-[25%] flex justify-center">
            <div class="p-1 rounded-full bg-[#f3f048f9]">
              <img
                alt="Vue logo"
                class="hover:bg-[#f3f048f9] cursor-pointer rounded-xl"
                src="/assets/eye.svg"
                width="30"
                height="30"
              />
            </div>
          </router-link>
        </li>
      </section>
      <section
        v-else
        class="xl:w-[88vw] h-[70vh] w-[90%] relative overflow-auto flex flex-col gap-4 p-4 pt-7 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl"
      >
        <div class="items-center flex justify-center mt-[20vh]" v-if="loading">
          <LoaderforList />
        </div>
        <li
          v-else
          v-for="i in vagas1"
          :key="i.id"
          class="h-[3rem] text-white font-bold w-full flex-row flex justify-around items-center rounded-lg bg-[#2A753D]"
        >
          <div class="pl-4 w-[45%]">
            <span> {{ i.nome }} </span>
          </div>
          <div class="pl-4 w-[25%]">
            <span>{{ i.nivel }} </span>
          </div>
          <router-link :to="'/ranking/' + i.id" class="pl-6 w-[25%] flex justify-center">
            <div class="p-1 rounded-full bg-[#f3f048f9]">
              <img
                alt="Vue logo"
                class="hover:bg-[#f3f048f9] cursor-pointer rounded-xl"
                src="/assets/eye.svg"
                width="30"
                height="30"
              />
            </div>
          </router-link>
        </li>
      </section>
    </div>
  </div>
</template>
