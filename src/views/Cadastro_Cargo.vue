<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue';  
import Alert from '@/components/alert/Alert.vue'
import axios from "axios"
import { ref } from 'vue';
const name = ref('')
const level = ref('')
const desc_hab = ref('')
const desc_ati = ref('')
const desc_cap = ref('')
const erro = ref('')
const isDisabled = ref(true);
const isDone = ref(false);
const Play = ref(false);



async function cadatrar() {
  try{
    await axios.post("https://localhost:8080/descricaoCargo" ,{
    desc_vaga: name.value, 
    desc_nivel : level.value,
    desc_habilidades : desc_hab.value,
    desc_atitudes : desc_ati.value,
    desc_capacidades : desc_cap.value
  });
  isDone.value = false
  console.log(`${name.value} + ${level.value} + ${desc_hab.value} + ${desc_ati.value} + ${desc_cap.value}`)
  }catch(err){
    erro.value = (err as Error).message
  }
  console.log("passei")
}

async function getResponseChatgpt(name : String , level : String) {
  console.log("carregando")
  try{
    await axios.get(`https://jsonplaceholder.typicode.com/chatgp/${name} ${level}`,{

  });
  played()
  }catch(err){
    erro.value = (err as Error).message
  }

}

const habilitarInput = () => {
  isDisabled.value = !isDisabled.value;
};
const success = () => {
  
}

const played = () =>{
  Play.value = true
}

</script>


<template>
  <div class="bg-white flex w-screen h-screen">
    <OpenMenu/>
    <div class="flex ml-[5rem] w-screen items-center flex-col bg-white">
      <div v-if="isDone">
        <Alert variant="success"/>
      </div >
       <h1 class="text-center font-medium text-3xl mt-7 flex w-full h-10 justify-center items-center ">
        Cadastro Cargo
      </h1>
      <p class="text-red-700">{{ erro }}</p>
      <div class="w-[98%] flex flex-col gap-10 p-4 h-[80vh] mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl">
       <div class="w-full flex flex-row justify-between">
         <div class="w-1/3 flex flex-col ">
      <span class="bg-[#FFD600] w-[7rem] font-semibold top-[7.5rem] shadow-md rounded-lg ml-4 absolute  text-center">
        Nome
      </span>
      <input  
     v-model="name" id="name"
     placeholder="Nome do Cargo"
      class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF]">   
    </div>
    <div class="w-1/3 flex flex-col ">
      <span class="bg-[#FFD600] w-[7rem] font-semibold top-[7.5rem] shadow-md rounded-lg ml-4 absolute  text-center">
        Nível
      </span>
      <input 
      v-model="level" id="level"
      placeholder="Nome do Cargo"
       class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF]">   
    </div>
       </div>
          <div class="w-full rounded-2xl px-10 py-7 h-[45vh] flex flex-col shadow-md text-white bg-[#2A753D]">
            <span class="bg-[#FFD600] w-[7rem] top-[12.8rem] shadow-md rounded-lg text-black font-semibold absolute  text-center">
              CHA
            </span>
            <div class="w-full h-full flex justify-between">
              <textarea 
                rows="4" 
                v-model="desc_hab" id="desc_hab"
                :disabled="isDisabled"
                placeholder="Descrição de habilidade será gerada..."
                class="w-5/6 h-[75%] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl">
              </textarea>
              <textarea 
                rows="4" 
                v-model="desc_ati" id="desc_ati"
                :disabled="isDisabled"
                placeholder="Descrição de atitude será gerada..."
                class="w-5/6 h-[75%] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl">
              </textarea>
              <textarea 
                rows="4" 
                v-model="desc_cap" id="desc_cap"
                :disabled="isDisabled"
                placeholder="Descrição de capacidade será gerada..."
                class="w-5/6 h-[75%] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl">
              </textarea>
             <div @click="getResponseChatgpt(name , level )"
             class="bg-black cursor-pointer rounded-full shadow-md p-6  flex justify-center  h-[3.7rem]">
               <img src="/assets/play.svg" width="20" height="20" alt="" srcset="">
             </div>
            </div>
            <div 
            v-if="Play"
            @click="habilitarInput"
            class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center">
                <p v-if="isDisabled" class="font-bold text-base" >Aprimorar</p>
                <p v-else class="font-bold text-base" >Voltar</p>
            </div>
          </div>
          <div class="w-full flex justify-center text-[#fff] ">
              <button v-if="Play" class="bg-[#263001] w-[15rem] rounded-xl" @click="cadatrar" type="submit" value="Cadastrar" >
              <p class="text-lg font-bold p-1">
                Cadastrar
              </p>
            </button>
          </div>
         
        </div>
    </div>
  </div>
</template>