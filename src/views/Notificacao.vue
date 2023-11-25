<script lang="ts" setup>
import OpenMenu from '@/components/menu/OpenMenu.vue'
import LoaderforList from '@/components/LoaderforList.vue'
import api from '@/services/api'
import { defineComponent, onMounted, ref } from 'vue'
import { useAuth } from '@/stores/auth'
const namesearch = ref('')
const erro = ref('')
const isSeach = ref(false)
const loading = ref(true)
const auth = useAuth()
const notifications = ref()
const fetchEmpresa = async () => {
  const empresaId = auth.getUser.id
  loading.value = true
  try {
    const response = await api.get('/notification/' + empresaId)
    notifications.value = response.data.sort((a : any, b : any) => b.id - a.id)
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
}

const formatarDataHora = (datetime : Date) => {
  const dataHora = new Date(datetime);
  const dataFormatada = dataHora.toLocaleDateString();
  const horaFormatada = dataHora.toLocaleTimeString();
  return `${dataFormatada} ${horaFormatada}`;
}

const deleteNotification = (index: number): void => {
  notifications.value.splice(index, 1)
}

onMounted(fetchEmpresa)
</script>

<template>
  <div class="bg-white relative flex w-screen h-screen overflow-x-hidden">
    <OpenMenu />

    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white overflow-y-scroll">
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
      >
        Notificações
      </h1>
      <div
        class="xl:w-[88vw] h-[75vh] w-[90%] relative overflow-auto flex flex-col items-center gap-4 p-4 pt-7 mt-3 shadow-md bg-opacity-30 rounded-2xl"
      >
        <div
          v-for="(notification, index) in notifications"
          :key="index"
          class="w-[100%] rounded-md relative flex flex-col gap-2 p-4 pt-2 mb-2 bg-[#1DEEA3] shadow-md bg-opacity-30 border-black"
        >
          <div class="flex items-start">
            <img src="/assets/calendar.svg" alt="Ícone de Calendário" class="w-6 h-6 mr-2" />
            <div class="text-sm">{{formatarDataHora(notification.datetime)}}</div>
          </div>
          <div v-if="notification.type == 'Request'" class="mt-0">
            O CHA para Vaga {{ notification.nome }}   {{ notification.nivel }} foi gerado com sucesso 
          </div>
          <div v-else class="mt-0">
           Seus Resultados para a vaga {{ notification.nome }}   {{ notification.nivel }} estão prontos 
          </div>
          <!-- <img
            src="/assets/Trash.svg"
            alt="Ícone de Lixeira"
            class="w-6 h-6 cursor-pointer absolute bottom-2 right-2"
            @click="deleteNotification(index)"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>
