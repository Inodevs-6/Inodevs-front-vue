<script lang="ts" setup>
import inputs from '../components/inputs.vue'
import OpenMenu from '@/components/menu/OpenMenu.vue';  
</script>

<template>
  <div class="bg-white flex w-screen h-screen">
    <OpenMenu/>
    <div class="flex ml-[5rem] w-screen items-center flex-col bg-white">
       <h1 class="text-center font-medium text-3xl mt-7 flex w-full h-10 justify-center items-center ">
        Cadastro Cargo
      </h1>
      <form class="w-[98%] flex flex-col gap-10 p-4 h-[80vh] mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl">
       <div class="w-full flex flex-row justify-between">
         <inputs label="Nome"/>
         <inputs label="Nível"/>
       </div>
          <div class="w-full rounded-2xl px-10 py-7 h-[45vh] flex flex-col shadow-md text-white bg-[#2A753D]">
            <span class="bg-[#FFD600] w-[7rem] top-[12.8rem] shadow-md rounded-lg text-black font-semibold absolute  text-center">
              CHA
            </span>
            <div class="w-full h-full flex justify-between">
              <textarea 
                rows="4" 
                placeholder="sua descrição será gerada"
                class="w-5/6 h-[75%] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl">
              </textarea>
             <div class="bg-black rounded-full shadow-md p-5 flex justify-center  h-[3.7rem]">
               <img src="../assets/play.svg" width="20" height="20" alt="" srcset="">
             </div>
            </div>
            <div class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center">
                <p class="font-bold text-base" >Aprimorar</p>
            </div>
          </div>
          <div class="w-full flex justify-center text-[#fff] ">
              <button class="bg-[#263001] w-[15rem] rounded-xl" type="submit" value="Cadastrar" >
              <p class="text-lg font-bold p-1">
                Cadastrar
              </p>
            </button>
          </div>
         
      </form>
    </div>
  </div>
  <main>
    
  </main>
</template>