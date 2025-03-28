// src/lib/services/userService.ts
import api from '../api/axios';
import axios from 'axios';
import { User, GetAllUser, LoginResponse, LoginCredentials, UserPayload } from './types/userTypes';

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

  async CreateOrUpdateUser(userData: UserPayload): Promise<UserPayload> {
    try {
      const { data } = await api.post<User>('api/User/CreateOrUpdateUser', userData);
      const userPayload: UserPayload = {
        ...userData,
        ...data,
      };
      return userPayload;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`User creation failed: ${error.message}`);
      } else {
        throw new Error('User creation failed: Unknown error');
      }
    }
  },

  getAllUsers: async (): Promise<GetAllUser[]> => {
    try  {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Token não encontrado no localStorage. Por favor, faça login novamente.");
      }

      const response = await api.get<GetAllUser[]>("/api/User/GetAllUsers");

      return response.data || [];
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        throw new Error("Sessão expirada ou inválida. Por favor, faça login novamente.");
      } else {
        if (error instanceof Error) {
          throw new Error("Falha ao carregar a lista de usuários: " + (error.message || "Erro desconhecido"));
        } else {
          throw new Error("Falha ao carregar a lista de usuários: Erro desconhecido");
        }
      }
    }
  },

  deleteUser: async (userId: number): Promise<void> => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
      }
      
      await api.delete(`/api/User/DeleteUserId/${userId}`);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Sessão expirada. Faça login novamente.");
        }
        throw new Error(error.response?.data?.message || "Falha ao deletar usuário");
      }
      throw new Error("Erro desconhecido ao deletar usuário");
    }
  }
};

setupAuthInterceptor();