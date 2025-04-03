import api from '../api/axios';
import { Supplier, SupplierCreate } from './types/supplierTypes'; // Adicione o tipo SupplierCreate

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
  createSupplier: async (supplierData: SupplierCreate): Promise<Supplier> => {
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

  // BUSCAR POR CNPJ (GET) - Mantido igual
  getSupplierByCNPJ: async (cnpj: string): Promise<Supplier> => {
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

  // LISTAR TODOS (GET) - Mantido igual
  getAllSuppliers: async (): Promise<Supplier[]> => {
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