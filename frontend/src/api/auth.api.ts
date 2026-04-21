import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const authApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = (payload: { name: string; email: string; password: string }) =>
  authApi.post('/auth/register', payload);

export const loginUser = (payload: { email: string; password: string }) =>
  authApi.post('/auth/login', payload);

export const getMeApi = () => authApi.get('/auth/me');
