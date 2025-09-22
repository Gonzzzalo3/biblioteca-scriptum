// src/services/comment/comment.js
import axios from "../axiosInstance";

export const getBookComments = (id_libro) =>
  axios.get(`/comment/libro/${id_libro}`);

export const getBookRatingSummary = (id_libro) =>
  axios.get(`/comment/libro/${id_libro}/resumen`);

export const createComment = (data) =>
  axios.post("/comment", data);

export const editComment = (id, data) =>
  axios.put(`/comment/${id}`, data);

export const deleteComment = (id) =>
  axios.delete(`/comment/${id}`);

export const getOwnComments = () =>
  axios.get("/comment/mis-comentarios");

export const disableComment = (id) =>
  axios.put(`/comment/${id}/desactivar`);

export const restoreComment = (id) =>
  axios.put(`/comment/${id}/restaurar`);