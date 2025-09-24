// src/services/user.js
import axios from "../axiosInstance";

// Perfil público (no requiere token)
export const getPublicProfile = (id) =>
  axios.get(`/user/profile/${id}`);

// Perfil privado (usuario autenticado)
export const getMyProfile = () =>
  axios.get("/user/profile");

export const updateMyProfile = (data) =>
  axios.put("/user/profile", data);

export const changeMyPassword = (actual, nueva, repetir) =>
  axios.put("/user/change-password", { actual, nueva, repetir });

export const deleteMyProfile = (contraseña) =>
  axios.delete("/user/profile", { data: { contraseña } });

// Admin
export const listClients = () =>
  axios.get("/user/clients");

export const updateUserStatus = (id, accion) =>
  axios.put(`/user/update-status/${id}`, { accion });

export const getAllUsersWithStatus = () =>
  axios.get("/user/usuarios/status");