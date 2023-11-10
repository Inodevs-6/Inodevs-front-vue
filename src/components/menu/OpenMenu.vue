<template>
  <RouterView />
  <div
    class="bg-[#CCFF00] hidden h-screen w-[5rem] fixed justify-start flex-col gap-6 p-2 items-center xl:flex"
  >
    <RouterLink to="/">
      <BtnMenu caminho="/assets/logo.svg" />
    </RouterLink>
    <RouterLink to="/Notificacao" class="flex flex-row justify-between items-center">
        <BtnMenu caminho="/assets/Bell.svg" />
    </RouterLink>
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
<script lang="ts" setup>
import BtnMenu from '@/components/menu/BtnMenu.vue'
import MenuMobile from '@/components/menu/MenuMobile.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuth } from '@/stores/auth'
import router from '@/router'
const notify = null

function logout() {
  const auth = useAuth()
  auth.clear()
  router.push('/')
}
</script>
