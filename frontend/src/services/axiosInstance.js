import axios from "axios";

// Instancia principal de Axios para llamadas autenticadas
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ← debe definirse en .env
  withCredentials: true, // Incluye cookies en cada solicitud
});

// Interceptor de solicitud: agrega token JWT si está presente en localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de respuesta: maneja expiración de token y solicita renovación automática
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isTokenExpired =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.mensaje === "Token expirado";

    if (isTokenExpired) {
      originalRequest._retry = true;

      try {
        console.log("Token expirado, solicitando refresh...");

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        console.log("Nuevo token recibido:", newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Error al renovar token:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;