import { logout } from '@/redux/Slice/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      // localStorage.removeItem('token');
      // localStorage.removeItem('role');
      // localStorage.removeItem('user-data');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
