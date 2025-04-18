import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;