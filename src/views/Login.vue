<script lang="ts" setup>
import SobreInfo from "@/components/Login/SobreInfo.vue"
const Email = "a"
const senha = "a"
const Logar = () => {
    console.log("loguei")
}
</script>

<template>
<section class="w-screen p-5 h-screen flex justify-center items-center overflow-hidden bg-[#2A753D]">
<div class="bg-[#ffff] p-5 flex flex-row w-[95%] h-[95%] rounded-2xl shadow-xl">
<SobreInfo/>
<div class="w-[50%] h-full bg-[#2A753D] rounded-2xl p-3 flex flex-col items-center gap-7  shadow-md">
    <img
    alt="Vue logo"
    class="mt-3"
    src="/assets/profile.svg"
    width="120"
    height="120"
  />
  <div class="relative w-[80%]">
    <span
        class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
        >
        Email
        </span>
         <input
        v-model="Email"
         id="Email"
         placeholder="Email"
        class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none rounded-xl text-[#000] relative z-0"
         />
  </div> 
  <div class="relative w-[80%]">
    <span
        class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
        >
        Senha
        </span>
         <input
        v-model="senha"
         id="senha"
         type="password"
         placeholder="Senha"
        class="bg-[#ffffff] w-full h-11 p-4 pt-4 shadow-md outline-none rounded-xl text-[#000] relative z-0"
         />
  </div> 
  <div class="flex items-start gap-2 flex-col">
    <span class="border-b-4 border-white text-white">
        Ainda nao tenho uma conta
    </span>
    <span class="border-b-4 border-white text-white">
       Esqueci minha senha 
    </span>
  </div>
 
    <button
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="Logar"
              type="submit"
              value="Enviar para Busca"
            >
              <p class="text-lg font-bold p-1 text-white">Logar</p>
            </button>
</div>
</div>
</section>
</template>

