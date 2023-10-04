<script lang="ts" setup>
interface Vaga {
  nome: string ;
  nivel : string;
  id : number
}


import LabelLista from '@/components/labels/Label-lista.vue';
import OpenMenu from '@/components/menu/OpenMenu.vue'
import api from '@/services/api';
import { onMounted, ref } from 'vue';

const erro = ref('')
const loading = ref(false)
const vagas: Vaga = ref([])

const fetchVagas = async () => {
  try{
    const response = await api.get('/vaga')
    vagas.value = response.data 
  }catch(error){
    erro.value = (error as Error).message
  }
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
      <LabelLista name="Vagas"  estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[6.7rem] left-[9rem] shadow-md rounded-lg text-center z-10"/>
      <LabelLista name="Nível" estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[6.7rem] right-[32rem] shadow-md rounded-lg text-center z-10"/>
      <LabelLista name="Visualizar" estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[6.7rem] right-[7rem] shadow-md rounded-lg text-center z-10"/>
      <section
        class="xl:w-[88vw] h-[79vh] w-[90%] relative overflow-auto flex flex-col gap-4 p-4 pt-7 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl"
      >
        <li v-for="vaga in vagas" :key="vaga.id"
          class="h-[3rem] text-white font-bold w-full flex-row flex justify-around items-center rounded-lg bg-[#2A753D]"
        >
          <div class="pl-4 w-[45%]">
            <span> {{ vaga.nome }} </span>
          </div>
          <div class="pl-4 w-[25%]">
            <span>{{ vaga.nivel }} </span>
          </div>
          <div class="pl-6 w-[25%] flex justify-center">
            <div class="p-1 rounded-full bg-[#f3f048f9]  bg-black">
              <img
                alt="Vue logo"
                class="hover:bg-[#f3f048f9] cursor-pointer  rounded-xl"
                src="/assets/eye.svg"
                width="30"
                height="30"
              />
            </div>
          </div>
        </li>
      </section>
    </div>
  </div>
</template>
