<script setup lang="ts">
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import { ref } from 'vue'
import router from '@/router'
import { useAuth } from '@/stores/auth'

const senha = ref('')
const senhaNovamente = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)

const valid = ref(false)

const save = ref(false)
const auth = useAuth()

const confirmarSenha = () => {
  erro.value = ''
  var comprimentoMinimo = 8;
  var comprimentoSenha = senha.value.length;
  var possuiComprimentoSuficiente = comprimentoSenha >= comprimentoMinimo;
  var possuiLetraMaiuscula = /[A-Z]/.test(senha.value);
  var possuiLetraMinuscula = /[a-z]/.test(senha.value);
  var possuiNumero = /\d/.test(senha.value);
  var possuiCaractereEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha.value);
  var senhasIguais = senha.value == senhaNovamente.value

  if (possuiComprimentoSuficiente && possuiLetraMaiuscula && possuiLetraMinuscula && possuiNumero && possuiCaractereEspecial && senhasIguais) {
    isDisabled.value = false
  } else {
    erro.value = "Senha inválida! Atenda todos requisitos."
  }
}

const salvar = () => {
  erro.value = ''
  // if (!senha.value || !senhaNovamente.value || senha.value !== senhaNovamente.value) {
  //   if (senha.value !== senhaNovamente.value) {
  //     erro.value = 'As senhas não estão iguais'
  //   }
  //   valid.value = true
  //   return
  // }
    try {
      const empresaId = auth.getUser.id
      api.patch(`/empresa/editar-senha/${empresaId}`, {
        id: empresaId,
        senha: senha.value
      })
      sucesso()
    } catch (error) {
      erro.value = (error as Error).message
    }
}

async function sucesso() {
  save.value = true
  setTimeout(() => {
    router.push('/Perfil')
  }, 2000)
}
</script>

<template>
  <div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <div v-if="isDone">
        <Alert variant="success" />
      </div>

      <div class="w-full flex justify-left mt-5">
        <div v-if="playMatch" class="w-[12rem] h-[2.5rem] justify-between text-[#fff] xl:absolute m-2">
          <router-link to="/Perfil">
            <button class="bg-[#263001] w-[10rem] rounded-xl" type="submit" value="Voltar">
              <p class="text-lg font-bold p-1">Voltar</p>
            </button>
          </router-link>
        </div>
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
            <p v-if="senha.length < 8 && senha.length > 0" class="text-red-600 text-lg font-bold mb-8 text-center"> 
              A senha deve ter pelo menos 8 caracteres.
            </p>
            <p v-else-if="!/[A-Z]/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mb-8 text-center">
              A senha deve conter pelo menos uma letra maiúscula.
            </p>
            <p v-else-if="!/[a-z]/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mb-8 text-center">
              A senha deve conter pelo menos uma letra minúscula.
            </p>
            <p v-else-if="!/\d/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mb-8 text-center">
              A senha deve conter pelo menos um número.
            </p>
            <p v-else-if="!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mb-8 text-center">
              A senha deve conter pelo menos um caractere especial.
            </p>
            <p v-else-if="senha !== senhaNovamente" class="text-red-600 text-lg font-bold mb-8 text-center">
              As senhas não estão iguais!
            </p>
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
