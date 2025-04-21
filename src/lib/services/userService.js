// userService.js
import axios from 'axios';

const API_URL = 'http://localhost:5012/api/User'; // Ajuste conforme a sua URL base da API

// Serviço de usuário
const userService = {
  // Método para login
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      
      // Salvar o token no localStorage para uso posterior
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  // Método para registro de usuário
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/Register`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  },

  // Método para obter todos os usuários (requer autenticação)
  getAllUsers: async () => {
    console.log('🔍 Starting getAllUsers function');
    try {
      console.log('📝 Checking for token in localStorage');
      const token = localStorage.getItem('token');
      console.log('🔑 Token found:', token ? 'Yes (token exists)' : 'No (token missing)');
      
      if (!token) {
        console.log('❌ No token found in localStorage');
        throw new Error('Token de autenticação não encontrado');
      }
  
      console.log('🌐 Preparing to make API request to', `${API_URL}/GetAllUsers`);
      console.log('📤 Request headers:', { Authorization: `Bearer ${token.substring(0, 10)}...` });
      
      const response = await axios.get(`${API_URL}/GetAllUsers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ API request successful');
      console.log('📊 Response status:', response.status);
      console.log('📦 Data received, item count:', Array.isArray(response.data) ? response.data.length : 'Not an array');
      console.log('📄 First few items:', Array.isArray(response.data) ? response.data.slice(0, 2) : response.data);
      
      return response.data;
    } catch (error) {
      console.log('❌ Error occurred in getAllUsers');
      console.log('📛 Error name:', error.name);
      console.log('💬 Error message:', error.message);
      console.log('🔍 Error response data:', error.response?.data);
      console.log('🔢 Error response status:', error.response?.status);
      console.log('📝 Full error object:', error);
      console.error('Erro ao obter usuários:', error);
      throw error;
    }
  },

  // Método para criar ou atualizar um usuário
// Método para criar ou atualizar um usuário
CreateOrUpdateUser: async (userData) => {
  console.log('🚀 Iniciando CreateOrUpdateUser');
  console.log('📦 Dados recebidos:', userData);
  console.log('🔍 Verificando ID:', userData.id ? `ID presente: ${userData.id}` : 'Sem ID (nova criação)');
  
  try {
    console.log('🔑 Verificando token no localStorage');
    const token = localStorage.getItem('token');
    console.log('🔑 Token encontrado:', token ? 'Sim (token existe)' : 'Não (token ausente)');
    
    if (!token) {
      console.log('❌ Token não encontrado no localStorage');
      throw new Error('Token de autenticação não encontrado');
    }

    // URL sempre será a mesma, independente de criar ou atualizar
    const url = `${API_URL}/CreateOrUpdateUser`;
    console.log('🌐 URL da API:', url);
    
    // Método sempre será POST para este endpoint
    const method = 'post';
    console.log('📝 Método HTTP:', method.toUpperCase());
    
    console.log('📤 Headers:', { Authorization: `Bearer ${token.substring(0, 10)}...` });
    console.log('📤 Enviando dados:', userData);
    
    const response = await axios({
      method,
      url,
      data: userData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Requisição bem-sucedida');
    console.log('📊 Status da resposta:', response.status);
    console.log('📦 Dados recebidos:', response.data);
    
    return response.data;
  } catch (error) {
    console.log('❌ Erro ocorrido em CreateOrUpdateUser');
    console.log('📛 Nome do erro:', error.name);
    console.log('💬 Mensagem de erro:', error.message);
    console.log('🔍 Dados da resposta do erro:', error.response?.data);
    console.log('🔢 Status da resposta do erro:', error.response?.status);
    console.log('📝 Objeto de erro completo:', error);
    
    console.error('Erro ao criar/atualizar usuário:', error);
    throw error;
  }
},
  // Método para deletar um usuário (requer autenticação)
  deleteUser: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await axios.delete(`${API_URL}/DeleteUserId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  },


  

  // Método para logout
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default userService;