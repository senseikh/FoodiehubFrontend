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

export const sendVerificationEmail = async () => {
  try {
    const response = await axios.post(
      `${VITE_API_URL}api/send-verification-email/`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const verifyEmail = async (uid, token) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}api/verify-email/${uid}/${token}/`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axios.post(
      `${VITE_API_URL}api/change-password/`,
      {
        old_password: oldPassword,
        new_password1: newPassword,
        new_password2: newPassword,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default Api;
