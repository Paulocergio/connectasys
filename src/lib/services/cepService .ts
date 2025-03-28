// src/lib/services/cepService.ts
import axios from 'axios';

export interface AddressData {
  address: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export const cepService = {
  async fetchAddressByCEP(cep: string): Promise<AddressData> {
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