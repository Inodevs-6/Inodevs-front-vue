<script setup lang="ts">
import OpenMenu from '@/components/menu/OpenMenu.vue'
import LabelLista from '@/components/labels/Label-lista.vue'
import { defineProps, onMounted, ref } from 'vue'
import api from '@/services/api'

interface Candidato {
  id: number
  experiencia: string
  link: string
}

interface CandidatoVaga {
  candidato: Candidato
  rank: number
  pontosCha: number
  percent_match: number
}

interface Vaga {
  id: number
  nome: string
  nivel: string
  candidatos: CandidatoVaga[]
}

const minMatch = ref('')
const maxMatch = ref('')
const erro = ref('')
const vaga = ref() as Vaga | any
const candidatos = ref()
const loading = ref(true)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

let candidatosFiltrados = ref([] as CandidatoVaga[])

const fetchCandidatos = async () => {
  loading.value = true
  try {
    const response = await api.get(`/vaga/match/${props.id}`)
    vaga.value = (await api.get(`/vaga/${props.id}`)).data
    candidatos.value = response.data
    candidatos.value.sort((a: CandidatoVaga, b: CandidatoVaga) =>
      a.rank > b.rank ? 1 : b.rank > a.rank ? -1 : 0
    )
    filtrarCandidatos()
  } catch (error) {
    if (error instanceof Error) {
      erro.value = error.message
    } else {
      erro.value = 'Ocorreu um erro desconhecido.'
    }
  }
  loading.value = false
}

function getCor(percentageMatch: number) {
  if (percentageMatch >= 0 && percentageMatch <= 25) {
    return 'red'
  } else if (percentageMatch >= 26 && percentageMatch <= 50) {
    return 'orange'
  } else if (percentageMatch >= 51 && percentageMatch <= 75) {
    return 'yellow'
  } else {
    return 'green'
  }
}

function filtrarCandidatos() {
  candidatosFiltrados.value = candidatos.value.filter((candidato: CandidatoVaga) => {
    if (minMatch.value === '' && maxMatch.value === '') {
      return true
    } else if (minMatch.value === '') {
      return candidato.percent_match <= parseInt(maxMatch.value)
    } else if (maxMatch.value === '') {
      return candidato.percent_match >= parseInt(minMatch.value)
    } else {
      return (
        candidato.percent_match >= parseInt(minMatch.value) &&
        candidato.percent_match <= parseInt(maxMatch.value)
      )
    }
  })
}

onMounted(fetchCandidatos)
</script>
<template>
  <div class="bg-white relative flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
        v-if="vaga"
      >
        Ranqueamento de {{ vaga.nome }} com nível {{ vaga.nivel }}
      </h1>

      <div class="filtro">
        <label for="minMatch">Mínimo Match (%):</label>
        <input
          type="number"
          id="minMatch"
          v-model="minMatch"
          @input="filtrarCandidatos"
          class="borda-filtro"
        />
        <label for="maxMatch">Máximo Match (%):</label>
        <input
          type="number"
          id="maxMatch"
          v-model="maxMatch"
          @input="filtrarCandidatos"
          class="borda-filtro"
        />
      </div>
      <LabelLista
        name="Candidato"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[9.4rem] left-[9rem] shadow-md rounded-lg text-center z-10"
      />
      <LabelLista
        name="Match"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[9.4rem] right-[32rem] shadow-md rounded-lg text-center z-10"
      />
      <LabelLista
        name="Porcetagem"
        estilo="bg-[#FFD600] w-[7rem] absolute font-bold top-[9.4rem] right-[7rem] shadow-md rounded-lg text-center z-10"
      />
      <section
        class="xl:w-[88vw] h-[70vh] w-[90%] relative overflow-auto flex flex-col gap-4 p-4 pt-7 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl"
      >
        <div
          v-for="(candidato, index) in candidatosFiltrados"
          :key="index"
          class="h-[3rem] text-white font-bold w-full flex-row flex justify-around items-center rounded-lg bg-[#2A753D]"
        >
          <div class="conteudo-candidatos flex items-center justify-around h-[3rem]">
            <a class="nome w-[7%] pl-4" :href="candidato.candidato.link"><img class="w-[2rem]" src="/assets/perfil.png" alt="user icon" /></a>
            <div class="barra rounded-full shadow-md border-black">
              <div
                class="barra-preenchida shadow-md rounded-full"
                :style="{
                  width: `${candidato.percent_match}%`,
                  backgroundColor: getCor(candidato.percent_match)
                }"
              ></div>
            </div>
            <div class="w-[10%] flex justify-center items-center">
              <div
                class="match-circle shadow-md"
                :style="{ backgroundColor: getCor(candidato.percent_match) }"
              >
                <span class="match text-black">{{ Math.round(candidato.percent_match) }}%</span>
              </div>
            </div>
            <!-- <router-link :to="'/visualizar/' + candidato.id">
            <button class="visualizar-button">Visualizar</button>
          </router-link> -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.titulo {
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 20px;
}

.borda-filtro {
  border: 1px solid #000;
  width: 70px;
  margin-left: 5px;
  margin-right: 10px;
}

.filtro {
  text-align: center;
  margin-bottom: 20px;
}

.candidato-card {
  border: 1px solid #ddd;
  padding: 16px;
  /* margin-bottom: 30px; */
  /* margin-left: 85px; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-candidatos {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  width: 100%;
}

.match {
  display: flex;
  text-align: center;
  /* width: 10%; */
}

.barra {
  position: relative;
  width: 60%;
  background-color: #eee;
  height: 10px;
}

.barra-preenchida {
  height: 100%;
  width: 0;
  transition: width 0.5s ease;
  border: solid 1px black;
}

.match-circle {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  /* right: -30px;
  top: -19px;
  font-size: 16px; */
}

.visualizar-button {
  flex: 1;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
