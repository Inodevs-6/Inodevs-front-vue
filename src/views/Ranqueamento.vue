<script  setup>
    import OpenMenu from '@/components/menu/OpenMenu.vue'
</script>
<template>
  <div>
    <OpenMenu />
    <div>
      <h1 class="titulo">Ranqueamento de Candidatos</h1>

      
      <div class="filtro">
        <label for="minMatch">Mínimo Match (%):</label>
        <input type="number" id="minMatch" v-model="minMatch" @input="filtrarCandidatos" class="borda-filtro" />
        <label for="maxMatch">Máximo Match (%):</label>
        <input type="number" id="maxMatch" v-model="maxMatch" @input="filtrarCandidatos" class="borda-filtro" />
      </div>

      
      <div v-for="(candidato, index) in candidatosFiltrados" :key="index" class="candidato-card">
        <div class="conteudo-candidatos">
          <span class="nome">{{ candidato.nome }}</span>
          <div class="barra">
            <div
              class="barra-preenchida"
              :style="{ width: `${candidato.match}%`, backgroundColor: getCor(candidato.match) }"
            ></div>
            <div class="match-circle" :style="{ backgroundColor: getCor(candidato.match) }">
              <span class="match">{{ candidato.match }}%</span>
            </div>
          </div>
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
        { id: 9, nome: 'Candidato 8', match: 5 },
        { id: 10, nome: 'Candidato 8', match: 15 },
        { id: 11, nome: 'Candidato 8', match: 24 },
        { id: 12, nome: 'Candidato 8', match: 30 },
        { id: 13, nome: 'Candidato 8', match: 43 },
        { id: 14, nome: 'Candidato 8', match: 50 },
      ],
      minMatch: '', 
      maxMatch: '', 
    };
  },
  computed: {
    candidatosFiltrados() {
      return this.candidatos.filter(candidato => {
        if (this.minMatch === '' && this.maxMatch === '') {
          return true;
        } else if (this.minMatch === '') {
          return candidato.match <= parseInt(this.maxMatch);
        } else if (this.maxMatch === '') {
          return candidato.match >= parseInt(this.minMatch);
        } else {
          return (
            candidato.match >= parseInt(this.minMatch) && candidato.match <= parseInt(this.maxMatch)
          );
      }
      });
    },
  },
  methods: {
    filtrarCandidatos() {},
    getCor(match) {
      
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


.match {
  flex: 1;
  text-align: center;
}

.barra {
  position: relative;
  width: 100%;
  background-color: #eee;
  height: 10px;
  margin-top: 8px;
  margin-right: 40px;
  margin-left: 10px;
}

.barra-preenchida {
  height: 100%;
  width: 0;
  transition: width 0.5s ease;
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
  position: absolute;
  right: -30px;
  top: -19px;
  font-size: 16px;
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


