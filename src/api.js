import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const VITE_API_URL = "https://foodiehub-727v.onrender.com";
const Api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: VITE_API_URL,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
