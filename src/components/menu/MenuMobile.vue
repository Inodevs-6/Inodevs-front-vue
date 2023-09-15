<template >
    <button
    v-if="!isOpenMenu"
    @click="openMenu" class="m-2  bg-slate-100 p-2 hover:bg-slate-200 flex xl:hidden rounded-full fixed">
         <img src="assets/Menu.svg" width="27" height="27">
    </button >
    <div v-else class="w-screen z-30 flex absolute h-screen bg-white">
        <button
    @click="openMenu" class="m-2  bg-slate-100 p-2  hover:bg-slate-200 flex xl:hidden rounded-full fixed">
         <img src="assets/close.svg" width="27" height="27">
    </button > 
    <div class="bg-[#CCFF00] w-full flex justify-start p-3 pt-16 gap-8 flex-col items-start">
       
       <div class="flex flex-row">
           <BtnMenu caminho="/assets/Bell.svg"/>
           <p class="font-bold text-2xl">Notify</p>
       </div>
       <div class="absolute flex items-center justify-center bg-red-800 left-10 top-[4.7rem] rounded-full">
        <p class="text-white font-bold px-[0.4rem]">{{ notify }}</p>
       </div> 
       <RouterLink to="/" class="flex flex-row justify-between items-center ">
         <BtnMenu caminho="/assets/Home.svg"/> 
         <p class="font-bold text-2xl">Home</p>
       </RouterLink>
       <RouterLink to='/Cadastro_Cargo' class="flex flex-row justify-between items-center ">
         <BtnMenu caminho="/assets/Sum.svg"/> 
         <p class="font-bold text-2xl">Add CHA</p>
       </RouterLink>
      <div class="flex absolute  bottom-2 mb-[0.7rem]  cursor-pointer  flex-row ">
        <img alt="Vue logo" 
    class="logo" 
    src="/assets/Export.svg"
    width="40" height="40" />
    <p class="font-bold text-2xl">Logout</p>
      </div>
    </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import BtnMenu from "@/components/menu/BtnMenu.vue";
const isOpenMenu = ref(false)
const notify = null
const openMenu = () =>{
    isOpenMenu.value = !isOpenMenu.value
}
</script>
