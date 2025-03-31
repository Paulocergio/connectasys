import api from '../api/axios';
import { Supplier } from './types/supplierTypes';

// Configuração do interceptor
api.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("auth_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const supplierService = {
  getAllSuppliers: async (): Promise<Supplier[]> => {
    try {
      const response = await api.get('/api/CNPJ/all');
      
      // Debug: verifique a estrutura completa da resposta
      console.log('Resposta completa:', response);
      console.log('Dados recebidos:', response.data);
      
      // Tratamento robusto da resposta
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      throw new Error('Formato de dados inválido');
    } catch (error) {
      console.error('Erro no SupplierService:', error);
      throw error;
    }
  }
};