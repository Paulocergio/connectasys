// src/lib/services/supplierService.js
import api from '../api/axios';

// Configuração do interceptor (mantido igual)
api.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const supplierService = {
  // CADASTRAR NOVO FORNECEDOR (POST)
  async createSupplier(supplierData) {
    try {
      const response = await api.post('/api/CNPJ', supplierData);
      
      console.log('Resposta do cadastro:', response);
      
      if (response.data) {
        return response.data;
      }
      
      throw new Error('Erro ao cadastrar fornecedor');
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  },

  // BUSCAR POR CNPJ (GET)
  async getSupplierByCNPJ(cnpj) {
    try {
      const response = await api.get(`/api/CNPJ/${cnpj}`);
      if (response.data) {
        return response.data;
      }
      throw new Error('Fornecedor não encontrado');
    } catch (error) {
      console.error(`Erro ao buscar fornecedor com CNPJ ${cnpj}:`, error);
      throw error;
    }
  },

  // LISTAR TODOS (GET)
  async getAllSuppliers() {
    try {
      const response = await api.get('/api/CNPJ/all');
      if (Array.isArray(response.data)) {
        return response.data;
      }
      throw new Error('Formato de dados inválido');
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      throw error;
    }
  }
};

export default supplierService;