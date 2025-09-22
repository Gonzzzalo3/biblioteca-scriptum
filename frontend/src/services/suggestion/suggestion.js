import axios from "../axiosInstance";

// Crear sugerencia (CLIENTE)
export const createSuggestion = (data) =>
  axios.post("/suggestion", data);

// Editar sugerencia propia
export const updateSuggestion = (id, data) =>
  axios.put(`/suggestion/${id}`, data);

// Eliminar sugerencia propia
export const deleteOwnSuggestion = (id) =>
  axios.delete(`/suggestion/${id}`);

// Listar sugerencias propias (CLIENTE)
export const listOwnSuggestions = () =>
  axios.get("/suggestion/my");

// Listar todas las sugerencias (BIBLIOTECARIO)
export const listAllSuggestions = () =>
  axios.get("/suggestion");

// Obtener sugerencia por ID (BIBLIOTECARIO)
export const getSuggestionById = (id) =>
  axios.get(`/suggestion/${id}`);