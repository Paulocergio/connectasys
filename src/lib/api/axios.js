// src/api/axios.ts
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5012';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requisições
api.interceptors.request.use(
  config => {
    console.log('Payload da requisição:', config.data);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;