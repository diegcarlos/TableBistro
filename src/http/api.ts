import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.3.3:4444/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configurar o token de autenticação a partir do AsyncStorage
api.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  } catch (error) {
    console.error('Erro ao configurar token:', error);
    return config;
  }
});

api.interceptors.response.use(
  config => {
    const token = config.data?.token;
    const appToken = config.data?.appToken;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers['app-token'] = `Bearer ${appToken}`;
    }
    return config;
  },
  error => {
    // Melhorar o tratamento de erros para facilitar a depuração
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default api;
