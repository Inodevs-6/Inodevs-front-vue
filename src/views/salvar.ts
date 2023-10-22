import api from '../services/api';
import { erro, id, name, cnpj, email, save } from './Cadastro_Empresa.vue';

export async function salvar() {
erro.value = '';
try {
const empresaId = 1;
api.patch('/editar/' + empresaId + '/' + id.value, {
nome: name.value,
cnpj: cnpj.value,
email: email.value,
});
save.value = true;
} catch (error) {
erro.value = (error as Error).message;
}
}
