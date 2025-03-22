// src/services/userService.ts
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

interface PaginatedResponse {
  users: User[];
  totalPages: number;
}

// Main userService object with authentication methods
export const userService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    console.log('Credenciais enviadas para o servidor:', credentials);
    try {
      const response = await api.post<LoginResponse>('/api/User/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get all users function (sem paginação - versão original)
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<User[]>('/api/User/GetAllUsers');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },
  
  // Get all users with pagination
  getAllUsersPaginated: async (page: number, limit: number): Promise<PaginatedResponse> => {
    try {
      const response = await api.get<PaginatedResponse>(`/api/User/GetAllUsers?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar usuários paginados:', error);
      throw error;
    }
  },
  
  // Get user by id
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await api.get<User>(`/api/User/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar usuário ${id}:`, error);
      throw error;
    }
  },
  
  // Create new user
  createUser: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    try {
      const response = await api.post<User>('/api/User', userData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },
  
  // Update existing user
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<User>(`/api/User/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw error;
    }
  },
  
  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/User/${id}`);
    } catch (error) {
      console.error(`Erro ao excluir usuário ${id}:`, error);
      throw error;
    }
  }
};