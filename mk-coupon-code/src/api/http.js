import axios from 'axios';
import router from '../router';
import { useAuthStore } from '../stores/auth';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://65.108.157.163:3000/api',
});

// Request interceptor for adding authorization token
http.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

// Response interceptor for handling errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    
    if (error.response) {
      switch (error.response.status) {
        case 401:
          authStore.logout();
          router.push('/login');
          break;
        case 403:
          router.push('/forbidden');
          break;
        case 404:
          router.push('/not-found');
          break;
        default:
          break;
      }
    }
    
    return Promise.reject(error);
  }
);

export default http;