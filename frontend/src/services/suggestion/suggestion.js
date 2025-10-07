import axios from "../axiosInstance"; // Instancia con baseURL dinámica y token gestionado automáticamente

// Crear una nueva sugerencia (rol CLIENTE)
export const createSuggestion = (data) =>
  axios.post("/suggestion", data);

// Editar una sugerencia propia por ID
export const updateSuggestion = (id, data) =>
  axios.put(`/suggestion/${id}`, data);

// Eliminar una sugerencia propia por ID
export const deleteOwnSuggestion = (id) =>
  axios.delete(`/suggestion/${id}`);

// Listar todas las sugerencias propias del usuario autenticado (rol CLIENTE)
export const listOwnSuggestions = () =>
  axios.get("/suggestion/my");

// Listar todas las sugerencias del sistema (rol BIBLIOTECARIO)
export const listAllSuggestions = () =>
  axios.get("/suggestion");

// Obtener los detalles de una sugerencia específica por ID (rol BIBLIOTECARIO)
export const getSuggestionById = (id) =>
  axios.get(`/suggestion/${id}`);