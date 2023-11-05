<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref } from 'vue'
const nome = ref('')
const cnpj = ref('')
const email = ref('')
const senha = ref('')
const senhaNovamente = ref('')
const descricao = ref('')
const segmento = ref('')
const porte = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)

const valid = ref(false)

const save = ref(false)

const salvar = () => {
  erro.value = ''

  if (
    !nome.value ||
    !cnpj.value ||
    !email.value ||
    !senha.value ||
    !senhaNovamente.value ||
    !segmento.value ||
    !porte.value ||
    senha.value !== senhaNovamente.value
  ) {
    if (senha.value !== senhaNovamente.value) {
      erro.value = 'As senhas não estão iguais'
    }
    valid.value = true
    return
  }

  erro.value = ''
  try {
    api.post('/empresa', {
      nome: nome.value,
      cnpj: cnpj.value,
      email: email.value,
      senha: senha.value,
      descricao: descricao.value,
      segmento: segmento.value,
      porte: porte.value
    })
    save.value = true
  } catch (error) {
    erro.value = (error as Error).message
  }
}
</script>

<template>
  <div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <!-- <OpenMenu /> -->
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <div class="w-full p-2 fixed h-[2.5rem] justify-between text-[#fff]">
          <router-link to="/Perfil">
            <button class="bg-[#263001] w-[12rem] rounded-xl" type="submit" value="Voltar">
              <p class="text-lg font-bold p-1">Voltar</p>
            </button>
          </router-link>
        </div>
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-4 mt-3 flex w-full h-10 justify-center items-center"
      >
        Cadastro de Empresa
      </h1>
      <p v-if="senha !== senhaNovamente" class="text-red-600 text-lg  font-bold">
          As senhas não estão iguais !
        </p>
      <div
        class="xl:w-[60vw] w-[90%] flex flex-col gap-8 p-3 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-[45%] w-full flex flex-col relative left-2 top-[1rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome
            </span>
            <input
              v-model="nome"
              id="nome"
              placeholder="Nome da empresa"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
          <div class="xl:w-[50%] w-full flex flex-col relative right-2 top-[1rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Cnpj
            </span>
            <input
              v-model="cnpj"
              id="cnpj"
              placeholder="XX. XXX. XXX/0001-XX"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
        </div>
        <div class="flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="w-full">
            <div class="w-[90%] flex flex-col relative left-2 top-[1rem]">
              <span
                class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Email
              </span>
              <input
                v-model="email"
                id="email"
                placeholder="empresa@email.com"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="!isDisabled"
              />
            </div>
            <div class="w-[90%] flex flex-col relative top-[3rem] left-2">
              <span
                class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Senha
              </span>
              <input
                v-model="senha"
                id="senha"
                placeholder="*********"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="!isDisabled"
                type="password"
              />
            </div>
            <div class="w-[90%] flex flex-col relative top-[5rem] left-2">
              <span
                class="bg-[#FFD600] w-[13rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Confirme a Senha
              </span>
              <input
                v-model="senhaNovamente"
                id="senhaNovamente"
                placeholder="*********"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                :disabled="!isDisabled"
                type="password"
              />
            </div>
          </div>
          <div class="w-full flex flex-col relative right-2 top-[-0.4rem]">
            <span
              class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Descrição
            </span>
            <textarea
              v-model="descricao"
              id="descricao"
              placeholder="Empresa voltada para IA"
              class="h-[12rem] bg-[#084808] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
            >
            </textarea>
          </div>
        </div>
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-[45%] w-full flex flex-col relative left-2 top-[0rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Segmento
            </span>
            <input
              v-model="segmento"
              id="segmento"
              placeholder="Tecnologia"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            />
          </div>
          <div class="xl:w-[50%] w-full flex flex-col relative right-2 top-[0rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Porte
            </span>
            <select
              v-model="porte"
              id="porte"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
            >
              <option value="micro">Micro Empresa</option>
              <option value="pequeno">Pequena Empresa</option>
              <option value="medio">Média Empresa</option>
              <option value="grande">Grande Empresa</option>
            </select>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <div v-if="playMatch" class="w-[60%] flex justify-center text-[#fff]">
            <button
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="salvar"
              type="submit"
              value="Enviar para Busca"
            >
              <p class="text-lg font-bold p-1">Cadastrar</p>
            </button>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div
            v-if="valid"
            class="bg-[#cc0000] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Preencha todos os campos!</p>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div
            v-if="save"
            class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Empresa cadastrada com sucesso!</p>
          </div>
        </div>
        <div class="fixed bottom-2 right-5">
          <div
            v-if="erro"
            class="bg-[#cc0000] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">{{ erro }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
