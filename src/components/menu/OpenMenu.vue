<script lang="ts" setup>
import BtnMenu from '@/components/menu/BtnMenu.vue'
import MenuMobile from '@/components/menu/MenuMobile.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/stores/auth'
import router from '@/router'
import { onMounted, ref } from 'vue'
import api from '@/services/api'
import { useNotificationStore } from '@/stores/notifications'
const notificationStore = useNotificationStore();
const auth = useAuth();
const notifications = ref([]);
let oldNotifications = ref([]);

const fetchNotifications = async () => {
  if (notificationStore.notify == true) {
   return 
  }else{

  
  try {
    

    const response = await api.get(`/notification/${auth.getUser.id}`);
    const newNotifications = response.data;

    if (notificationStore.oldnotification.length > 0 && JSON.stringify(newNotifications) !== JSON.stringify(notificationStore.oldnotification)) {
      console.log("1");
      notificationStore.setNotify(true);
    } 
    notifications.value = newNotifications;
    notificationStore.setOldnotification(newNotifications.slice()) ; 
    console.log("passei");
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
  }
}
}



const clearNotify = () => {
  oldNotifications.value = [];
  notificationStore.setNotify(false);
  router.push("/Notificacao")
  console.log(oldNotifications.value)
  
}

onMounted(() => {
  if (!notificationStore.notify) {
    fetchNotifications();
    setInterval(fetchNotifications, 10000);
  }
});


function logout() {
  const auth = useAuth()
  auth.clear()
  router.push('/')
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
    <div v-if="notificationStore.notify"
      class="absolute flex items-center justify-center w-4 h-4 bg-red-800 left-10 top-[4.7rem] rounded-full"
    >
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

