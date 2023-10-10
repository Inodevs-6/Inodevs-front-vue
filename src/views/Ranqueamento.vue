<script  setup>
    import OpenMenu from '@/components/menu/OpenMenu.vue'
</script>
<template>
  <div>
    <OpenMenu />
    <div>
      <h1 class="titulo">Ranqueamento de Candidatos</h1>

      <!-- Caixa de filtro por porcentagem de match -->
      <div class="filtro">
        <label for="filtroMatch">Selecionar porcentagem de match:</label>
        <select id="filtroMatch" v-model="filtroSelecionado" @change="filtrarCandidatos" class="borda-filtro">
          <option value="todos">Todas</option>
          <option value="0-25">0% - 25%</option>
          <option value="26-50">26% - 50%</option>
          <option value="51-75">51% - 75%</option>
          <option value="76-100">76% - 100%</option>
        </select>
      </div>

      <!-- Lista de candidatos filtrados -->
      <div v-for="(candidato, index) in candidatosFiltrados" :key="index" class="candidato-card">
        <div class="conteudo-candidatos">
          <span class="nome">{{ candidato.nome }}</span>
          <div class="barra">
            <div
              class="barra-preenchida"
              :style="{ width: `${candidato.match}%`, backgroundColor: getCor(candidato.match) }"
            ></div>
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
      filtroSelecionado: '',
    };
  },
  computed: {
    candidatosFiltrados() {
      if (this.filtroSelecionado === '0-25') {
        return this.candidatos.filter(candidato => candidato.match >= 0 && candidato.match <= 25);
      } else if (this.filtroSelecionado === '26-50') {
        return this.candidatos.filter(candidato => candidato.match >= 26 && candidato.match <= 50);
      } else if (this.filtroSelecionado === '51-75') {
        return this.candidatos.filter(candidato => candidato.match >= 51 && candidato.match <= 75);
      } else if (this.filtroSelecionado === '76-100') {
        return this.candidatos.filter(candidato => candidato.match >= 76 && candidato.match <= 100);
      } else {
        return this.candidatos;
      }
    },
  },
  methods: {
    filtrarCandidatos() {},
    getCor(match) {
      // Definir cores com base na porcentagem de match
      if (match >= 0 && match <= 25) {
        return 'red';
      } else if (match >= 26 && match <= 50) {
        return 'orange';
      } else if (match >= 51 && match <= 75) {
        return 'yellow';
      } else {
        return 'green';
      }
    },
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

.borda-filtro {
  border: 1px solid #000;
}

.filtro {
  text-align: center;
  margin-bottom: 20px;
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
  width: 100%;
  background-color: #eee;
  height: 10px;
  margin-top: 8px;
}

.barra-preenchida {
  height: 100%;
  width: 0;
  transition: width 0.5s ease;
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


