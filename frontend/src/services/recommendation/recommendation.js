import axios from "../axiosInstance";

export const generateRecommendations = (data) =>
  axios.post("/recommendation/generate", data);

// Ver recomendaciones activas del usuario
export const getUserRecommendations = () =>
  axios.get("/recommendation");

// Limpiar recomendaciones obsoletas (libros ya reservados)
export const clearOldRecommendations = () =>
  axios.delete("/recommendation/clear");
