import axios from "../axiosInstance"; // Instancia con baseURL dinámica y token gestionado automáticamente

// Obtiene todos los comentarios asociados a un libro específico
export const getBookComments = (id_libro) =>
  axios.get(`/comment/libro/${id_libro}`);

// Obtiene el resumen de calificaciones (promedio, conteo) de un libro
export const getBookRatingSummary = (id_libro) =>
  axios.get(`/comment/libro/${id_libro}/resumen`);

// Crea un nuevo comentario sobre un libro
export const createComment = (data) =>
  axios.post("/comment", data);

// Edita un comentario existente por ID
export const editComment = (id, data) =>
  axios.put(`/comment/${id}`, data);

// Elimina un comentario por ID
export const deleteComment = (id) =>
  axios.delete(`/comment/${id}`);

// Obtiene todos los comentarios realizados por el usuario autenticado
export const getOwnComments = () =>
  axios.get("/comment/mis-comentarios");

// Desactiva (oculta) un comentario sin eliminarlo
export const disableComment = (id) =>
  axios.put(`/comment/${id}/desactivar`);

// Restaura un comentario previamente desactivado
export const restoreComment = (id) =>
  axios.put(`/comment/${id}/restaurar`);