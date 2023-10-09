<script  setup>
    import OpenMenu from '@/components/menu/OpenMenu.vue'
</script>
<template >
  <div >
    <OpenMenu/>
 
    <div>
      <h1 class="titulo">Ranqueamento de Candidatos</h1>
      <div v-for="(candidato, index) in candidatos" :key="index" class="candidato-card">
        <div class="conteudo-candidatos">
          <span class="nome">{{ candidato.nome }}</span>
          <div class="barra">
            <div class="barra-preenchida" :style="{ width: `${candidato.match}%` }"></div>
          </div>
          <span class="match">{{ candidato.match }}%</span>
          <router-link :to="'/visualizar/' + candidato.id">
            <button class="visualizar-button">Visualizar</button>
          </router-link>
        </div>
      </div>
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
      ],
    };
  },
};
</script>

<style scoped>
.titulo {
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 20px;
}

.candidato-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 30px;
  margin-left: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-candidatos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.nome,
.match {
  flex: 1;
  text-align: center;
}

.barra {
  flex: 4;
  background-color: #eee;
  height: 10px;
  margin: 0 10px;
  display: flex;
  align-items: center;
}

.barra-preenchida {
  flex: 1;
  height: 100%;
  background-color: #007bff;
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


