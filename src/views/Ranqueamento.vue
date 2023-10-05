<script  setup>
    import OpenMenu from '@/components/menu/OpenMenu.vue'
</script>
<template class="conteudo-candidatos">
  <div class="bg-white flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu/>
  </div>
  
  <div>
    <h1>Ranqueamento de Candidatos</h1>
    <div v-for="(candidato, index) in candidatos" :key="index" class="candidato-card">
      <div class="info">
        <span class="nome">{{ candidato.nome }}</span>
        <span class="match">{{ candidato.match }}%</span>
      </div>
      <div class="barra">
        <div class="barra-preenchida" :style="{ width: `${candidato.match}%` }"></div>
      </div>
      <router-link :to="'/visualizar/' + candidato.id">
        <button class="visualizar-button">Visualizar</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      candidatos: [
        { id: 1, nome: 'Candidato 1', match: 80 },
        { id: 2, nome: 'Candidato 2', match: 70 },
        { id: 3, nome: 'Candidato 3', match: 60 },
        { id: 4, nome: 'Candidato 4', match: 90 },
        { id: 5, nome: 'Candidato 5', match: 75 },
        { id: 6, nome: 'Candidato 6', match: 85 },
        { id: 7, nome: 'Candidato 7', match: 95 },
        { id: 8, nome: 'Candidato 8', match: 65 },
      ],
    };
  },
};
</script>

<style scoped>
.candidato-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-candidatos {
  margin-top: 100px;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nome {
  font-weight: bold;
}

.barra {
  width: 100%;
  background-color: #eee;
  height: 10px;
  margin-top: 8px;
}

.barra-preenchida {
  height: 100%;
  background-color: #007bff;
}

.visualizar-button {
  margin-top: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
</style>


