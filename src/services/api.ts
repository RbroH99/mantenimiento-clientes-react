import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://pruebareactjs.test-class.com/Api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function getToken(): string | null {
  return localStorage.getItem("token");
}

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Error con el token de acceso");
    return Promise.reject(error);
  }
);

export default apiClient;
