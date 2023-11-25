<script lang="ts" setup>
import BtnMenu from '@/components/menu/BtnMenu.vue'
import MenuMobile from '@/components/menu/MenuMobile.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/stores/auth'
import router from '@/router'
import { onMounted, ref } from 'vue'
import api from '@/services/api'
const notify = ref([]);
const notifications = ref();
let latestNotificationId = ref(null);
let oldNotificationId = ref(null);
let timer = ref()
function logout() {
  const auth = useAuth()
  auth.clear()
  router.push('/')
}
const auth = useAuth()
const fetchNotifications = async () => {
  try {
    const response = await api.get(`/notification/${auth.getUser.id}`);
    const newNotifications = response.data;

    if (newNotifications.length > 0) {
      const latestId = newNotifications[newNotifications.length - 1].id;
      if (latestId !== latestNotificationId) {
        console.log(`Mudou o ID, o novo ID é ${latestId}`);
        latestNotificationId = latestId;
        if (oldNotificationId === latestNotificationId) {
          notify.value = 0;
        } else {
          notify.value = 1;
          oldNotificationId = latestNotificationId;
        }
      }
    }
    notifications.value = newNotifications;
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
  }
};
onMounted(() => {
  fetchNotifications(); 
  timer.value = setInterval(fetchNotifications, 10000);
});

const clearNotify = () => {
  notify.value = 0
  oldNotificationId = latestNotificationId; 
  router.push("/Notificacao")
}

</script>

<template>
  <RouterView />
  <div
    class="bg-[#CCFF00] hidden h-screen w-[5rem] fixed justify-start flex-col gap-6 p-2 items-center xl:flex"
  >
    <RouterLink to="/">
      <BtnMenu caminho="/assets/logo.svg" />
    </RouterLink>
    <div @click="clearNotify"
      class="flex flex-row justify-between items-center">
      <BtnMenu caminho="/assets/Bell.svg" />
    </div>
    <div
      class="absolute flex items-center justify-center bg-red-800 left-10 top-[4.7rem] rounded-full"
    >
      <p class="text-white font-bold px-[0.4rem]">{{ notify }}</p>
    </div>
    <RouterLink to="/home">
      <BtnMenu caminho="/assets/Home.svg" />
    </RouterLink>
    <RouterLink to="/Cadastro_Cargo">
      <BtnMenu caminho="/assets/Sum.svg" />
    </RouterLink>
    <RouterLink to="/Perfil">
      <BtnMenu caminho="/assets/perfil.png" />
    </RouterLink>
    <!-- <BtnMenu caminho="/assets/listicone.svg" /> -->
    <!-- </RouterLink> -->
    <div
      to="/"
      class="flex absolute bottom-2 mb-[0.7rem] cursor-pointer flex-row gap-5"
      @click="logout"
    >
      <img alt="Vue logo" class="logo" src="/assets/Export.svg" width="40" height="40" />
    </div>
  </div>
  <div>
    <MenuMobile></MenuMobile>
  </div>
</template>

