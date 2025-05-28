import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // atau http://localhost:8000/api
});


instance.interceptors.request.use(config => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
