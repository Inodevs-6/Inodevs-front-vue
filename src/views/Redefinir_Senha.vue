<script setup lang="ts">
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref } from 'vue'

const senha = ref('')
const senhaNovamente = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)

const valid = ref(false)

const save = ref(false)

const confirmarSenha = () => {
  isDisabled.value = false
}

const salvar = () => {
  erro.value = ''

  if (!senha.value || !senhaNovamente.value || senha.value !== senhaNovamente.value) {
    if (senha.value !== senhaNovamente.value) {
      erro.value = 'As senhas não estão iguais'
    }
    valid.value = true
    return
  }

  erro.value = ''
  try {
    api.post('/empresa', {
      senha: senha.value,
      senhaNovamente: senhaNovamente.value
    })
    save.value = true
  } catch (error) {
    erro.value = (error as Error).message
  }
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
        Redefinição de Senha
      </h1>
      <div
        class="xl:w-[80vw] h-[30vw] w-[90%] flex flex-col gap-8 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="flex flex-col justify-center items-center">
          <div class="xl:w-[45%] w-full flex flex-col relative left-2 top-[1rem]">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nova Senha
            </span>
            <input
              v-model="senha"
              id="senha"
              placeholder="******"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
              type="password"
            />
          </div>

          <div class="xl:w-[45%] w-full flex flex-col relative left-2 top-[2.5rem]">
            <span
              class="bg-[#FFD600] w-[13rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Confirme a Nova Senha
            </span>
            <input
              v-model="senhaNovamente"
              id="senhaNovamente"
              placeholder="******"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              :disabled="!isDisabled"
              type="password"
            />
          </div>
        </div>

        <p v-if="senha !== senhaNovamente" class="text-red-600 text-lg font-bold">
          As senhas não estão iguais !
        </p>
        <div class="w-full flex justify-center mt-10">
          <div v-if="playMatch" class="w-[60%] flex justify-center text-[#fff]">
            <button
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="confirmarSenha"
              type="submit"
              value="Confirmar"
            >
              <p class="text-lg font-bold p-1">Confirmar</p>
            </button>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <div class="w-[60%] flex justify-center text-[#fff]">
            <button
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="salvar"
              type="submit"
              value="Enviar para Busca"
              :disabled="isDisabled"
              :class="{ 'opacity-50': isDisabled }"
            >
              <p class="text-lg font-bold p-1">Cadastrar Nova Senha</p>
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
            <p class="text-[#fff] text-lg font-bold p-1">Nova senha cadastrada com sucesso!</p>
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
