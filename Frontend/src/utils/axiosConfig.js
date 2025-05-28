import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers : {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default instance;