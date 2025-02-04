import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const VITE_API_URL = "http://127.0.0.1:8000";
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
