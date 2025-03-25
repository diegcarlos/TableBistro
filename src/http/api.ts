import axios from 'axios';
const api = axios.create({
  baseURL: process.env.URL_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  config => {
    const token = config.data?.token;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
