<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import Loader from '@/components/Loader.vue'
import Alert from '@/components/alert/Alert.vue'
import api from '../services/api'
import ia from '../services/ia'
import router from '@/router'
import { ref, defineProps, onMounted } from 'vue'
import { useAuth } from '@/stores/auth'
const name = ref('')
const level = ref('')
const conhecimentos = ref('')
const habilidades = ref('')
const atitudes = ref('')
const erro = ref('')
const isDisabled = ref(true)
const isDone = ref(false)
const Play = ref(false)
const playMatch = ref(true)
const loading = ref(false)
const loadingC = ref(false)
const loadingH = ref(false)
const loadingA = ref(false)
const matching = ref(false)
const scrapping = ref(false)
const valid = ref(false)
const comentario = ref('')
const modalOpened = ref(false)
const modalOpened1 = ref(false)
const idd = ref(0)
const vaga = ref([])
const auth = useAuth()
const save = ref(false)
const saved = ref(false)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const fetchCha = async () => {
  loading.value = true
  try {
    const empresaId = auth.getUser.id
    const response = await api.get(`/editar/${empresaId}/${props.id}`)
    vaga.value = response.data
    name.value = response.data.vaga.nome
    level.value = response.data.vaga.nivel
    conhecimentos.value = response.data.conhecimentosEditado
    habilidades.value = response.data.habilidadesEditado
    atitudes.value = response.data.atitudesEditado
    console.log(response.data)
  } catch {
    try {
      const response = await api.get(`/vaga/match/${props.id}`)
      vaga.value = response.data
      name.value = response.data.nome
      level.value = response.data.nivel
      conhecimentos.value = response.data.conhecimentos
      habilidades.value = response.data.habilidades
      atitudes.value = response.data.atitudes
      console.log(response.data)
    } catch (error) {
      if (error instanceof Error) {
        erro.value = error.message
      } else {
        erro.value = 'Ocorreu um erro desconhecido.'
      }
    }
  }
  loading.value = false
}
async function sucesso() {
modalOpened.value = true
saved.value = true
  setTimeout(() => {
  router.push('/home')
}, 2000)
}
async function sucesso1() {
modalOpened1.value = true
if (!saved.value) {
setTimeout(() => {
  router.push('/home')
}, 2000)
}
}

async function editar() {
  loading.value = true
  erro.value = ''
  try {
    const empresaId = auth.getUser.id
    const response = await api.patch('/editar/' + empresaId + '/' + props.id, {
      nome: name.value,
      nivel: level.value,
      conhecimentos: conhecimentos.value,
      habilidades: habilidades.value,
      atitudes: atitudes.value
    })
    save.value = true
    sucesso()
  } catch (error) {
    erro.value = (error as Error).message
  }
  loading.value = false
}

async function aprimorar(campo: String) {
  erro.value = ''

  if (campo == 'Conhecimentos') {
    loadingC.value = true
  }
  if (campo == 'Habilidades') {
    loadingH.value = true
  }
  if (campo == 'Atitudes') {
    loadingA.value = true
  }
  if (campo == 'Geral') {
    loadingC.value = true
    loadingH.value = true
    loadingA.value = true
  }

  try {
    let cha = ''

    if (campo == 'Geral') {
      cha += '{"descricao": '
    }
    if (campo == 'Conhecimentos' || campo == 'Geral') {
      cha += '{"Conhecimentos": ['
      conhecimentos.value
        .trim()
        .split('\n')
        .forEach((palavra, index) => {
          if (index != 0) {
            cha += ', "' + palavra + '"'
          } else {
            cha += '"' + palavra + '"'
          }
        })
      cha += ']}'
    }
    if (campo == 'Geral') {
      cha += ', '
    }
    if (campo == 'Habilidades' || campo == 'Geral') {
      cha += '{"Habilidades": ['
      habilidades.value
        .trim()
        .split('\n')
        .forEach((palavra, index) => {
          if (index != 0) {
            cha += ', "' + palavra + '"'
          } else {
            cha += '"' + palavra + '"'
          }
        })
      cha += ']}'
    }
    if (campo == 'Geral') {
      cha += ', '
    }
    if (campo == 'Atitudes' || campo == 'Geral') {
      cha += '{"Atitudes": ['
      atitudes.value
        .trim()
        .split('\n')
        .forEach((palavra, index) => {
          if (index != 0) {
            cha += ', "' + palavra + '"'
          } else {
            cha += '"' + palavra + '"'
          }
        })
      cha += ']}'
    }
    if (campo == 'Geral') {
      cha += '}'
    }

    console.log(cha)

    const response = await ia.post('/upgrade', {
      cargo: name.value,
      nivel: level.value,
      cha: cha,
      campo: campo,
      comentario: comentario.value
    })

    if (campo == 'Conhecimentos') {
      conhecimentos.value = ''
      response.data.Conhecimentos.forEach((palavra: string) => {
        conhecimentos.value += palavra + '\n'
      })
    }
    if (campo == 'Habilidades') {
      habilidades.value = ''
      response.data.Habilidades.forEach((palavra: string) => {
        habilidades.value += palavra + '\n'
      })
    }
    if (campo == 'Atitudes') {
      atitudes.value = ''
      response.data.Atitudes.forEach((palavra: string) => {
        atitudes.value += palavra + '\n'
      })
    }
    if (campo == 'Geral') {
      conhecimentos.value = ''
      response.data.descricao.Conhecimentos.forEach((palavra: string) => {
        conhecimentos.value += palavra + '\n'
      })
      habilidades.value = ''
      response.data.descricao.Habilidades.forEach((palavra: string) => {
        habilidades.value += palavra + '\n'
      })
      atitudes.value = ''
      response.data.descricao.Atitudes.forEach((palavra: string) => {
        atitudes.value += palavra + '\n'
      })
    }
  } catch (error) {
    erro.value = (error as Error).message
  }
  loadingC.value = false
  loadingH.value = false
  loadingA.value = false
}

async function match() {
  loading.value = true
  try {
    played()
    scrapping.value = true
    matching.value = false
    editar()
    await ia.post('/scrap')
    scrapping.value = false
    await ia.post('/match', {
      cargo: name.value.replace(' ', ''),
      nivel: level.value.replace(' ', '')
    })
    matching.value = true
    played()
 
    const response_notification = (
      await api.post('/notification', {
        type : "Results",
        nome: name.value,
        nivel: level.value,
        empresa: {
            id: auth.getUser.id
          }
      })
    )
    sucesso1()
    console.log("Notificação de results")
  } catch (err) {
    erro.value = (err as Error).message
  }
  loading.value = false
}

async function getResponseChatgpt() {
  loadingC.value = true
  loadingH.value = true
  loadingA.value = true
  valid.value = false
  try {
    if (name.value != '' && level.value != '') {
      played()
      const response = (
        await ia.post('/chat', {
          cargo: name.value.replace(' ', ''),
          nivel: level.value.replace(' ', '')
        })
      ).data
      idd.value = response.id
      for (let i = 0; i < response.descricao.Conhecimentos.length; i++) {
        conhecimentos.value += response.descricao.Conhecimentos[i] + '\n'
      }
      for (let i = 0; i < response.descricao.Habilidades.length; i++) {
        habilidades.value += response.descricao.Habilidades[i] + '\n'
      }
      for (let i = 0; i < response.descricao.Atitudes.length; i++) {
        atitudes.value += response.descricao.Atitudes[i] + '\n'
      }
      habilitarInput()
      playMatch.value = true
    } else {
      valid.value = true
    }
  } catch (err) {
    erro.value = (err as Error).message
  }
  loadingC.value = false
  loadingH.value = false
  loadingA.value = false
}

const habilitarInput = () => {
  isDisabled.value = !isDisabled.value
}

const played = () => {
  Play.value = true
}

onMounted(fetchCha)
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
        v-if="vaga"
      >
        Edição de Vaga
      </h1>
      <div
        class="xl:w-[88vw] w-[90%] flex flex-col gap-8 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl relative"
      >
        <div class="w-full flex flex-col gap-5 xl:gap-0 xl:flex-row justify-between">
          <div class="xl:w-1/3 w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nome da Vaga
            </span>
            <input
              v-model="name"
              id="name"
              placeholder="Nome da Vaga"
              class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              disabled
            />
          </div>
          <div class="xl:w-1/3 w-full flex flex-col relative">
            <span
              class="bg-[#FFD600] w-[7rem] absolute bottom-[2.1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
            >
              Nível
            </span>
            <input
              v-model="level"
              id="level"
              placeholder="Nível da Vaga"
              class="bg-[#2A753D] w-full h-11 p-2 pt-2 shadow-md outline-none rounded-xl text-[#FFF] relative z-0"
              disabled
            />
          </div>
        </div>
        <div class="h-full flex flex-col justify-between">
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Conhecimentos
          </span>
          <textarea
            v-if="!loadingC"
            rows="4"
            v-model="conhecimentos"
            id="conhecimentos"
            placeholder="Descrição de conhecimentos será gerada"
            :disabled="isDisabled"
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
          <div
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl"
            v-else
          >
            <Loader />
          </div>
          <button
            v-if="(!loadingC && Play) || !isDisabled"
            @click="aprimorar('Conhecimentos')"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-[58rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Habilidades
          </span>
          <textarea
            v-if="!loadingH"
            rows="4"
            v-model="habilidades"
            id="habilidades"
            placeholder="Descrição de habilidade será gerada..."
            :disabled="isDisabled"
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
          <div
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl"
            v-else
          >
            <Loader />
          </div>
          <button
            v-if="(!loadingH && Play) || !isDisabled"
            @click="aprimorar('Habilidades')"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-[58rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <span
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Atitudes
          </span>
          <textarea
            v-if="!loadingA"
            rows="4"
            v-model="atitudes"
            id="atitudes"
            placeholder="Descrição de atitude será gerada..."
            :disabled="isDisabled"
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>

          <div
            class="h-[10rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-center items-center rounded-xl"
            v-else
          >
            <Loader />
          </div>
          <button
            v-if="(!loadingA && Play) || !isDisabled"
            @click="aprimorar('Atitudes')"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-[58rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <span
            v-if="!isDisabled"
            class="bg-[#FFD600] w-[9rem] relative top-[1rem] left-4 font-semibold shadow-md rounded-lg text-center z-10"
          >
            Comentário
          </span>
          <textarea
            v-if="!isDisabled"
            rows="4"
            v-model="comentario"
            id="comentario"
            placeholder="Adicione um comentário caso necessário para fazer o aprimoramento com configurações mais avançadas."
            :disabled="isDisabled"
            class="h-[8rem] bg-[#2A753D] p-4 focus:outline-none flex resize-none shadow-xl justify-start rounded-xl text-white"
          >
          </textarea>
          <button
            v-if="!isDisabled"
            @click="aprimorar('Geral')"
            class="bg-[#FFD600] w-[9rem] relative top-[-2rem] left-[58rem] font-semibold shadow-md rounded-lg text-center z-10"
          >
            Aprimorar
          </button>
          <div
            v-if="!Play && !isDisabled"
            @click="getResponseChatgpt()"
            class="bg-black cursor-pointer absolute top-[5.5rem] right-12 xl:right-[5rem] rounded-full shadow-md xl:p-5 p-2 flex justify-center xl:h-[3.7rem] h-[2rem]"
          >
            <div class="xl:flex hidden">
              <img src="/assets/play.svg" width="20" height="20" alt="" srcset="" />
            </div>
            <div class="flex xl:hidden">
              <img src="/assets/play.svg" width="14" height="14" alt="" srcset="" />
            </div>
          </div>
        </div>

        <!-- <p v-if="loading">Carregando CHA...</p> -->
        <!-- <div    
            v-if="Play"
            @click="habilitarInput"
            class="bg-[#FFD600] text-black p-[0.3rem] w-32 shadow-md rounded-xl flex justify-center">
                <p v-if="isDisabled" class="font-bold text-base" >Aprimorar</p>
                <p v-else class="font-bold text-base" >Voltar</p>
            </div> -->
        <div class="w-full flex justify-center">
          <div v-if="playMatch" class="w-[60%] flex justify-between text-[#fff]">
            <!-- <button class="bg-[#263001] w-[15rem] rounded-xl" @click="editar" type="submit" value="Editar" >
                <p class="text-lg font-bold p-1">
                  Editar
                </p>
              </button> -->

            
            <button
            v-if="!isDisabled"
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="editar"
              :disabled="loading"
              type="submit"
              value="Enviar para Busca"
            >
              <p  v-if="!loading" class="text-lg font-bold p-1">Salvar</p>
              <div class="flex justify-center items-center p-1" v-else><Loaderinputs/></div>
            </button>
            <button
              v-if="isDisabled"
              class="bg-[#263001] w-[10rem] rounded-xl"
              @click="habilitarInput"
              type="submit"
              value="Enviar para Busca"
            >
              <p class="text-lg font-bold p-1">Editar</p>
            </button>

            <button
              class="bg-[#263001] w-[16rem] rounded-xl"
              @click="match"
              type="submit"
              value="Enviar para Busca"
            >
              <p class="text-lg font-bold p-1">Salvar e Buscar Candidatos</p>
            </button>
          </div>
        </div>
        <div
          v-if="modalOpened"
          id="myModal"
          class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div class="modal-content flex items-center gap-5 justify-center flex-col bg-white p-5 rounded shadow-md w-[30rem] relative">
            <h2 v-if="!erro" class="text-xl font-bold">Vaga Editado com sucesso</h2>
            <span v-if="erro" class="text-red-700 font-semibold">{{ erro }}</span>
            <img src="/assets/sucess.svg" alt="sucess" width="50"  />
            <div class="w-full flex justify-center items-center flex-col">
              <h2 class="text-base font-bold">Você será redirecionado para pagina de Home</h2>
              <h2 class="text-base font-bold">Em Instantes</h2>
            </div>
          </div>
        </div>
        <div
          v-if="modalOpened1"
          id="myModal"
          class="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20"
        >
          <div class="modal-content flex items-center gap-5 justify-center flex-col bg-white p-5 rounded shadow-md w-[30rem] relative">
            <h2  v-if="!erro" class="text-xl font-bold">Vaga Editada  com sucesso e Busca Iniciada </h2>
            <span v-if="erro" class="text-red-700 font-semibold">{{ erro }}</span>
            <img src="/assets/sucess.svg" alt="sucess" width="50"  />
            <div class="w-full flex justify-center items-center flex-col">
              <h2 class="text-base font-bold">Você será redirecionado para pagina de Home</h2>
              <h2 class="text-base font-bold">Em Instantes</h2>
            </div>
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

        <!-- <div class="fixed bottom-2 right-5">
          <div
            v-if="save"
            class="bg-[#2A753D] w-[25rem] rounded-xl border-solid border-white border-2 text-center"
            type="submit"
          >
            <p class="text-[#fff] text-lg font-bold p-1">Vaga salva com sucesso!</p>
          </div>
        </div> -->

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
