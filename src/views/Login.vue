<script lang="ts" setup>
import SobreInfo from '@/components/Login/SobreInfo.vue'
import Loader from '@/components/Loaderlogin.vue'
import { ref } from 'vue'
// import { useRouter } from 'vue-router';
import { RouterLink, RouterView } from 'vue-router'
import api from '@/services/api'
import router from '@/router'
import { useAuth } from '@/stores/auth'
const auth = useAuth()
const Email = ref()
const senha = ref()
const erro = ref()
const dataMessage = ref()
const loading = ref(false)
const Logando = async () => {
  erro.value = ''
  loading.value = true

  try {
    const response = await api.post('/login', {
      username: Email.value,
      password: senha.value
    })
    dataMessage.value = response.data

    if (response.data.token) {
      auth.setToken(response.data.token)
      auth.setUser(response.data.empresa)
      router.push('/home')
    } else {
      console.log('Token não recebido.')
    }
  } catch (error) {
    erro.value = (error as Error).message
    console.log(erro)
  }

  loading.value = false
}
</script>

<template>
  <section
    class="w-screen p-5 h-screen flex justify-center items-center overflow-hidden bg-[#2A753D]"
  >
    <div class="bg-[#ffff] p-5 flex flex-row w-[95%] h-[95%] rounded-2xl shadow-xl">
      <SobreInfo />
      <div
        class="xl:w-[50%] w-[100%] h-full bg-[#2A753D] rounded-2xl p-3 flex flex-col items-center gap-7 shadow-md"
      >
        <img alt="Vue logo" class="mt-3" src="/assets/profile.svg" width="120" height="120" />
        <div class="relative w-[80%]">
          <span class="text-base text-center flex text-red-950 justify-center pb-3">{{
            erro
          }}</span>
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
          <RouterLink to="/Cadastro_Empresa" class="border-b-4 border-white text-white">
            Ainda não tenho uma conta
          </RouterLink>

          <RouterLink to="/Redefinir_Senha" class="border-b-4 border-white text-white">
            Esqueci minha senha
          </RouterLink>
        </div>

        <button class="bg-[#273201] w-[10rem] rounded-xl" @click="Logando" type="submit">
          <p v-if="!loading" class="text-lg font-bold p-1 text-white">Logar</p>
          <div class="flex justify-center items-center p-1" v-else><Loader /></div>
        </button>
      </div>
    </div>
  </section>
</template>
