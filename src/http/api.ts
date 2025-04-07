import axios from 'axios';
const api = axios.create({
  baseURL: 'http://192.168.3.3:4444/',
  headers: {
    'Content-Type': 'application/json',
  },
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
    return Promise.reject(error);
  },
);

export default api;
