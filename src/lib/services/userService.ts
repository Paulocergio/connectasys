import api from '../api/axios';
import { User } from './types/User';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    email: string;
    firstName: string;
    role: string;
    isActive: boolean;
  };
  token: string;
}

interface GetAllUser {
  id: number;
  firstName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface userCreate {
  firstName: string;
  email: string;
  phoneNumber: string;
  PasswordHash: string; // Ajustado para corresponder ao backend
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

// Configurar interceptor para incluir token em todas as requisições
export const setupAuthInterceptor = () => {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

// Main userService object with authentication methods
export const userService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    console.log('Credenciais enviadas para o servidor:', credentials);
    try {
      const response = await api.post<LoginResponse>('/api/User/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
        setupAuthInterceptor();
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async (): Promise<GetAllUser[]> => {
    try {
      console.log("Iniciando requisição de getAllUsers...");
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Token não encontrado no localStorage. Por favor, faça login novamente.");
      }
      console.log("Token encontrado:", token.substring(0, 15) + "...");
      const response = await api.get<GetAllUser[]>("/api/User/GetAllUsers");
      console.log("Status da resposta:", response.status);
      console.log("Headers da resposta:", response.headers);
      console.log("Dados da resposta:", response.data);
      if (!response.data) {
        console.warn("A resposta foi bem-sucedida, mas não contém dados!");
      }
      return response.data || [];
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
      if (error.response) {
        console.error("Detalhes do erro de resposta:");
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
        console.error("Dados:", error.response.data);
      } else if (error.request) {
        console.error("Não houve resposta do servidor:", error.request);
      } else {
        console.error("Erro na configuração da requisição:", error.message);
      }
      if (error.response && error.response.status === 401) {
        throw new Error("Sessão expirada ou inválida. Por favor, faça login novamente.");
      } else {
        throw new Error("Falha ao carregar a lista de usuários: " + (error.message || "Erro desconhecido"));
      }
    }
  },

  createUser: async (userData: Omit<userCreate, 'id'>): Promise<userCreate> => {
    try {
      console.log("Enviando dados para criar usuário:", userData); // Log para depuração
      const response = await api.post<userCreate>('api/User/CreateUser', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  deleteUser: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/User/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error);
      throw error;
    }
  },
};

// Inicializar interceptor ao carregar o módulo
setupAuthInterceptor();