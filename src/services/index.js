import { EventBus } from "@/utils/bus";
import axios from "axios";

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("REQUEST ERROR >", error?.response);
    const responseMessage =
      error.response?.data?.message ?? error.response?.data?.error;

    switch (error.response?.status) {
      case 400:
      case 404:
      case 500:
        EventBus.$emit("showAlert", {
          message:
            responseMessage ?? "Ocorreu um erro. Tente novamente mais tarde.",
          type: "error",
        });
        break;

      case 401:
        EventBus.$emit("showAlert", {
          message: responseMessage ?? "Usuário não autorizado.",
          type: "error",
        });
        localStorage.removeItem("isAuthenticated");
        EventBus.$emit("redirectToHome");
        break;

      default:
        EventBus.$emit("showAlert", {
          message: "Ocorreu um erro. Tente novamente mais tarde.",
          type: "error",
        });
        break;
    }

    throw error;
  }
);

export const login = async () => {
  return api.get(`${API_BASE_URL}/auth/login`);
};

export const logout = async () => {
  return api.get(`${API_BASE_URL}/auth/logout`);
};

export const getAllContacts = async () => {
  return api.get(`${API_BASE_URL}/contact`);
};

export default api;
