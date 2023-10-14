<script setup>
import OpenMenu from '@/components/menu/OpenMenu.vue'
import LabelLista from '@/components/labels/Label-lista.vue'
import { defineProps, onMounted, ref } from 'vue'
import api from '@/services/api'
const erro = ref('')
const vaga = ref([])
const loading = ref(true)
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const fetchVagas = async () => {
  loading.value = true
  try {
    const response = await api.get(`/vaga/match/${props.id}`)
    vaga.value = response.data
    console.log(repose.data)
  } catch (error) {
    if (error instanceof Error) {
      erro.value = error.message
    } else {
      erro.value = 'Ocorreu um erro desconhecido.'
    }
  }
  loading.value = false
}

const fetchCandidatos = async () => {
  loading.value = true
  try {
    const response = await api.get(`/vaga/match/${props.id}`)
    vaga.value = response.data
    console.log(repose.data)
  } catch (error) {
    if (error instanceof Error) {
      erro.value = error.message
    } else {
      erro.value = 'Ocorreu um erro desconhecido.'
    }
  }
  loading.value = false
}
onMounted(fetchVagas)
onMounted(fetchCandidatos)
</script>
<template>
  <div class="bg-white relative flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
      >
        Ranqueamento de {{ vaga.nome }}
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
        name="Nome"
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
            <span class="nome w-[20%] pl-4">{{ candidato.nome }}</span>
            <div class="barra rounded-full shadow-md border-black">
              <div
                class="barra-preenchida shadow-md rounded-full"
                :style="{ width: `${candidato.match}%`, backgroundColor: getCor(candidato.match) }"
              ></div>
            </div>
            <div class="w-[10%] flex justify-center items-center">
              <div
                class="match-circle shadow-md"
                :style="{ backgroundColor: getCor(candidato.match) }"
              >
                <span class="match text-black">{{ candidato.match }}%</span>
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

<script>
export default {
  data() {
    return {
      candidatos: [
        { id: 1, nome: 'Candidato 1', match: 30 },
        { id: 2, nome: 'Candidato 2', match: 70 },
        { id: 3, nome: 'Candidato 3', match: 60 },
        { id: 4, nome: 'Candidato 4', match: 90 },
        { id: 5, nome: 'Candidato 5', match: 75 },
        { id: 6, nome: 'Candidato 6', match: 85 },
        { id: 7, nome: 'Candidato 7', match: 95 },
        { id: 8, nome: 'Candidato 8', match: 65 },
        { id: 9, nome: 'Candidato 9', match: 5 },
        { id: 10, nome: 'Candidato 10', match: 15 },
        { id: 11, nome: 'Candidato 11', match: 24 },
        { id: 12, nome: 'Candidato 12', match: 30 },
        { id: 13, nome: 'Candidato 13', match: 43 },
        { id: 14, nome: 'Candidato 14', match: 50 }
      ],
      minMatch: '',
      maxMatch: ''
    }
  },
  computed: {
    candidatosFiltrados() {
      return this.candidatos.filter((candidato) => {
        if (this.minMatch === '' && this.maxMatch === '') {
          return true
        } else if (this.minMatch === '') {
          return candidato.match <= parseInt(this.maxMatch)
        } else if (this.maxMatch === '') {
          return candidato.match >= parseInt(this.minMatch)
        } else {
          return (
            candidato.match >= parseInt(this.minMatch) && candidato.match <= parseInt(this.maxMatch)
          )
        }
      })
    }
  },
  methods: {
    filtrarCandidatos() {},
    getCor(match) {
      if (match >= 0 && match <= 25) {
        return 'red'
      } else if (match >= 26 && match <= 50) {
        return 'orange'
      } else if (match >= 51 && match <= 75) {
        return 'yellow'
      } else {
        return 'green'
      }
    }
  }
}
</script>

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
