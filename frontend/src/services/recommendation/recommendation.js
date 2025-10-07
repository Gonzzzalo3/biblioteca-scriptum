import axios from "../axiosInstance"; // Instancia con baseURL dinámica y token gestionado automáticamente

// Genera nuevas recomendaciones para el usuario actual
export const generateRecommendations = (data) =>
  axios.post("/recommendation/generate", data);

// Obtiene las recomendaciones activas del usuario autenticado
export const getUserRecommendations = () =>
  axios.get("/recommendation");

// Elimina recomendaciones obsoletas (por ejemplo, libros ya reservados)
export const clearOldRecommendations = () =>
  axios.delete("/recommendation/clear");