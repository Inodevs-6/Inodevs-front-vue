<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import ia from '../services/ia'
import { ref } from 'vue'
const name = ref('')
const cnpj = ref('')
const email = ref('')
const senha = ref('')
const senhaNovamente = ref('')
const descricao = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const Play = ref(false)
const playMatch = ref(true)
const loadingC = ref(false)
const loadingH = ref(false)
const loadingA = ref(false)

const valid = ref(false)

const id = ref(0)
const save = ref(false)

const salvar = () => {
  erro.value = '';
  
  if (!name.value || !cnpj.value || !email.value || senha.value || senhaNovamente.value ) {
    valid.value = true;
    return; 
  }
  
  erro.value = ''
  try {
    const empresaId = 1
    api.patch('/editar/' + empresaId + '/' + id.value, {
      nome: name.value,
      cnpj: cnpj.value,
      email: email.value,
      senha: senha.value,
      senhaNovamente: senhaNovamente.value
    })
    save.value = true
  } catch (error) {
    erro.value = (error as Error).message
  }
};
   
const habilitarInput = () => {
  isDisabled.value = !isDisabled.value
}

const played = () => {
  Play.value = true
}
</script>

<template>
  <div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <div v-if="isDone">
        <Alert variant="success" />
      </div>
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
      >
        Cadastro de Empresa
      </h1>
      <div
        class="xl:w-[88vw] w-[90%] flex flex-col gap-8 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-1/3 w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome
            </span>
            <input
              v-model="name"
              id="name"
              placeholder="Nome da empresa"
              class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
          <div class="xl:w-1/3 w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Cnpj
            </span>
            <input
              v-model="cnpj"
              id="cnpj"
              placeholder="XX. XXX. XXX/0001-XX"
              class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
          
        </div>
        <div class="xl:w-full w-full flex flex-col relative">
          <span class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">
            Email
          </span>
          <input v-model="email" id="email" placeholder="empresa@email.com" class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0" :disabled="!isDisabled" />
        </div>
        <div class="xl:w-full w-full flex flex-col relative">
          <span class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">
            Senha
          </span>
          <input v-model="senha" id="senha" placeholder="******" class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0" :disabled="!isDisabled" />
        </div>
        <div class="xl:w-full w-full flex flex-col relative">
          <span class="bg-[#FFD600] w-[13rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10">
            Digite novamente
          </span>
          <input v-model="senhaNovamente" id="senhaNovamente" placeholder="******" class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0" :disabled="!isDisabled" />
          
        </div>
        
        <div class="h-full flex flex-col justify-between">
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Descrição
          </span>
          <textarea
            v-model="descricao"
            id="descricao"
            placeholder="Empresa voltada para IA"
            :disabled="isDisabled"
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
        </div>
        <p v-if="senha !== senhaNovamente" class="text-red-600">As senhas não estão iguais</p>
        <div class="w-full flex justify-center">
          <div v-if="playMatch" class="w-[60%] flex justify-center text-[#fff]">
            <button class="bg-[#263001] w-[10rem] rounded-xl" @click="salvar" type="submit" value="Enviar para Busca">
              <p class="text-lg font-bold p-1">Cadastrar</p>
            </button>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div v-if="valid" class="bg-[#cc0000] w-[25rem] rounded-xl border-solid border-white border-2 text-center" type="submit">
            <p class="text-[#fff] text-lg font-bold p-1">Preencha todos os campos!</p>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div v-if="save" class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center" type="submit">
            <p class="text-[#fff] text-lg font-bold p-1">Empresa cadastrada com sucesso!</p>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div v-if="erro" class="bg-[#cc0000] w-[25rem] rounded-xl border-solid border-white border-2 text-center" type="submit">
            <p class="text-[#fff] text-lg font-bold p-1">{{ erro }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>