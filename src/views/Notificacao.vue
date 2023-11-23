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
const notification = ref()
const fetchEmpresa = async () => {
  const empresaId = auth.getUser.id
  loading.value = true
  try {
    const response = await api.get('/notification/' + empresaId)
    notification.value = response.data
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
}

const notifications = ref([
  {
    dateTime: '2023-11-15 12:30',
    description: 'Esta é uma notificação de exemplo 1.'
  },
  {
    dateTime: '2023-11-16 09:45',
    description: 'Esta é uma notificação de exemplo 2.'
  },
  {
    dateTime: '2023-11-17 12:30',
    description: 'Esta é uma notificação de exemplo 3.'
  },
  {
    dateTime: '2023-11-18 09:45',
    description: 'Esta é uma notificação de exemplo 4.'
  },
  {
    dateTime: '2023-11-18 09:45',
    description: 'Esta é uma notificação de exemplo 5.'
  },
  {
    dateTime: '2023-11-18 09:45',
    description: 'Esta é uma notificação de exemplo 6.'
  },
  {
    dateTime: '2023-11-18 09:45',
    description: 'Esta é uma notificação de exemplo 7.'
  },

  {
    dateTime: '2023-11-18 09:45',
    description: 'Esta é uma notificação de exemplo 8.'
  },

  {
    dateTime: '2023-11-18 09:45',
    description: 'Esta é uma notificação de exemplo 9.'
  }
])

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
            <div class="text-sm">{{ notification.dateTime }}</div>
          </div>
          <div class="mt-0">
            {{ notification.description }}
          </div>
          <img
            src="/assets/Trash.svg"
            alt="Ícone de Lixeira"
            class="w-6 h-6 cursor-pointer absolute bottom-2 right-2"
            @click="deleteNotification(index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
