// src/lib/services/cepService.js
import axios from 'axios';

export const cepService = {
  async fetchAddressByCEP(cep) {
    try {
      // Remove caracteres não numéricos
      const cleanedCEP = cep.replace(/\D/g, '');
      
      if (cleanedCEP.length !== 8) {
        throw new Error('CEP inválido');
      }

      const response = await axios.get(`https://viacep.com.br/ws/${cleanedCEP}/json/`);
      const data = response.data;

      if (data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        address: data.logradouro || '',
        complement: data.complemento || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
        country: 'Brasil'
      };
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      throw error;
    }
  }
};
export default cepService;