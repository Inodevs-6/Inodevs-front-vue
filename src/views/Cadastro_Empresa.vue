<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Alert from '@/components/alert/Alert.vue'
import router from '@/router'
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
const validErro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const playMatch = ref(true)
const modalOpened = ref(false)
// const errorCode = ref()

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
    !porte.value
  ) {
    validErro.value = "Preencha todos os campos!"
  } else {
    var comprimentoMinimo = 8;
    var comprimentoSenha = senha.value.length;
    var possuiComprimentoSuficiente = comprimentoSenha >= comprimentoMinimo;
    var possuiLetraMaiuscula = /[A-Z]/.test(senha.value);
    var possuiLetraMinuscula = /[a-z]/.test(senha.value);
    var possuiNumero = /\d/.test(senha.value);
    var possuiCaractereEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha.value);

    if (possuiComprimentoSuficiente && possuiLetraMaiuscula && possuiLetraMinuscula && possuiNumero && possuiCaractereEspecial) {
      validErro.value = ''
    
      api.post('/empresa', {
        nome: nome.value,
        cnpj: cnpj.value,
        email: email.value,
        senha: senha.value,
        descricao: descricao.value,
        segmento: segmento.value,
        porte: porte.value
      }).then(response => {
        console.log(response);
        sucesso();
      }).catch(error => {
        erro.value = (error as Error).message;
        console.error("Erro:", error);
      });
        
  } 
  }

}

async function sucesso() {
  modalOpened.value = true
  setTimeout(() => {
    router.push('/home')
  }, 2000)
}
</script>

<template>
  <div class="bg-white flex w-screen h-screen">
    <!-- <OpenMenu /> -->
    <div class="flex w-screen items-center flex-col bg-white">
      <div class="w-full p-2 xl:absolute text-[#fff]">
          <router-link to="/Perfil">
            <button class="bg-[#263001] w-[8rem] rounded-xl" type="submit" value="Voltar">
              <p class="text-lg font-bold p-1">Voltar</p>
            </button>
          </router-link>
        </div>
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-4 mt-3 flex w-full h-10 justify-center items-center"
      >
        Cadastro de Empresa
      </h1>
        <div v-if="validErro" class="text-red-600 text-lg font-bold mt-2">{{ validErro }} </div>
        <p v-if="senha !== senhaNovamente" class="text-red-600 text-lg font-bold mt-2">
          As senhas não estão iguais!
        </p>
        <p v-else-if="senha.length < 8 && senha.length > 0" class="text-red-600 text-lg font-bold mt-2">
          A senha deve ter pelo menos 8 caracteres.
        </p>
        <p v-else-if="!/[A-Z]/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mt-2">
          A senha deve conter pelo menos uma letra maiúscula.
        </p>
        <p v-else-if="!/[a-z]/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mt-2">
          A senha deve conter pelo menos uma letra minúscula.
        </p>
        <p v-else-if="!/\d/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mt-2">
          A senha deve conter pelo menos um número.
        </p>
        <p v-else-if="!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(senha) && senha.length > 0" class="text-red-600 text-lg font-bold mt-2">
          A senha deve conter pelo menos um caractere especial.
        </p>
        <div
          class="xl:w-[80vw] w-[90%] flex items-center flex-col gap-3 p-8 mt-[1.5rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
        >
      <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between mt-3">
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome
            </span>
            <input
              v-model="nome"
              id="name"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              placeholder="Nome da empresa"
            />
          </div>
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              CNPJ
            </span>
            <input
              v-model="cnpj"
              id="level"
              placeholder="XX. XXX. XXX/0001-XX"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
        </div>
 
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between mt-3">
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <div class="relative">
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
              />
            </div>
         
            <div class="relative mt-6">
              <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Senha
              </span>
              <input
                v-model="senha"
                id="senha"
                placeholder="********"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                type="password"
              />
            </div>
 
            <div class="relative mt-6">
              <span
                class="bg-[#FFD600] w-[12rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Confirme a Senha
              </span>
              <input
                v-model="senhaNovamente"
                id="senhaNovamente"
                placeholder="********"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
                type="password"
              />
            </div>
          </div>
 
          <div class="xl:w-[46%] w-full flex flex-col relative mt-3">
              <span
                class="bg-[#FFD600] w-[7rem] absolute bottom-[95%] left-4 font-semibold shadow-md rounded-lg text-center z-10"
              >
                Descrição
              </span>
              <textarea
                v-model="descricao"
                placeholder="Empresa voltada para IA"
                id="descricao"
                class="bg-[#084808] h-[100%] w-full p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              ></textarea>
          </div>
        </div>
 
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between mt-3">
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Segmento
            </span>
            <input
              v-model="segmento"
              id="name"
              placeholder="Tecnologia"
              class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
            />
          </div>
          <div class="xl:w-[46%] w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Porte
            </span>
            <select
                v-model="porte"
                id="porte"
                class="bg-[#084808] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              >
                <option value="" disabled>
                  Selecione uma opção...
                </option>
                <option value="micro">Micro Empresa</option>
                <option value="pequeno">Pequena Empresa</option>
                <option value="médio">Média Empresa</option>
                <option value="grande">Grande Empresa</option>
              </select>
          </div>
        </div>
        <div class="w-full flex justify-center">
          <div v-if="playMatch" class="w-[60%] flex justify-center text-[#fff] mt-4">
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

        <div
          v-if="modalOpened"
          id="myModal"
          class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div class="modal-content flex items-center gap-5 justify-center flex-col bg-white p-5 rounded shadow-md w-[30rem] relative">
            <h2 class="text-xl font-bold">Empresa Cadastrada com Sucesso</h2>
            <span v-if="erro" class="text-red-700 font-semibold">{{ erro }}</span>
            <img src="/assets/sucess.svg" alt="sucess" width="50"  />
            <div class="w-full flex justify-center items-center flex-col">
              <h2 class="text-base font-bold">Você será redirecionado para pagina de Login</h2>
              <h2 class="text-base font-bold">Em Instantes</h2>
            </div>
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