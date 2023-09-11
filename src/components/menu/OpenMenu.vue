<template >
  <RouterView/>
    <div class="bg-[#CCFF00] h-screen w-[5rem] fixed justify-start flex-col gap-6 p-2 items-center flex ">
      <RouterLink to="/">
        <BtnMenu caminho="/assets/logo.svg"/> 
      </RouterLink>
       <BtnMenu caminho="/assets/Bell.svg"/> 
       <RouterLink to="/">
         <BtnMenu caminho="/assets/Home.svg"/> 
       </RouterLink>
       <RouterLink to='/Cadastro_Cargo'>
         <BtnMenu caminho="/assets/Sum.svg"/> 
       </RouterLink>
      <div class="flex absolute bottom-2 mb-[0.7rem]  cursor-pointer  flex-row gap-5">
        <img alt="Vue logo" 
    class="logo" 
    src="/assets/Export.svg"
    width="40" height="40" />
      </div>
    </div>
</template>
<script lang="ts" setup>
import BtnMenu from "@/components/menu/BtnMenu.vue";
import { RouterLink, RouterView } from 'vue-router'
</script>
