<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue';
        
</script>
<template >
<div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
        <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-1 mt-3 flex w-full h-10 justify-center items-center"
      >
        Notificação
      </h1>   
      <div
        class="xl:w-[90%] w-[90%] h-[80vh] flex flex-col justify-center items-center gap-5 p-3 mt-[1rem] bg-[#ffff] shadow-md bg-opacity-30 rounded-2xl relative"
      >
      <div class="w-[90%] bg-[#1DEEA3] h-[4rem] flex-col flex">
       <div class="w-full flex-row">
        <img src="/assets/calendar.svg" 
        width="25"
        height="25"
        alt="">
        <span>
            12/23 -
        </span>
        <span>
            12:40
        </span>
       </div> 
      <div class="flex w-full flex-row">
        Busca para a vaga de Desenvolvedor backend nível Senior Iniciada 
       <img src="/assets/Trash.svg" 
       width="25"
        height="25"
        alt="">
      </div>
       
      </div>
      </div>
    </div>
</div>

</template>
