import axios from "../axiosInstance"; // Instancia con baseURL dinámica y token gestionado automáticamente

// Obtiene todas las categorías disponibles en el sistema
export const getAllCategories = () =>
  axios.get("/category").then(res => res.data.categorias);

// Crea una nueva categoría (requiere permisos administrativos)
export const createCategory = (data) =>
  axios.post("/category", data);

// Actualiza una categoría existente por ID
export const updateCategory = (id, data) =>
  axios.put(`/category/${id}`, data);

// Elimina una categoría por ID
export const deleteCategory = (id) =>
  axios.delete(`/category/${id}`);