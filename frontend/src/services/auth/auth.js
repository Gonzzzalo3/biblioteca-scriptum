import axios from "../axiosInstance";

export const login = (credentials) => axios.post("/auth/login", credentials);
export const register = (userData) => axios.post("/auth/register", userData);

export const verifyAccount = (codigo) =>
  axios.post("/auth/verify", { codigo });

export const refreshToken = () => axios.post("/auth/refresh-token");

export const forgotPassword = (correo) =>
  axios.post("/auth/forgot-password", { correo });

export const verifyResetCode = (correo, codigo) =>
  axios.post("/auth/verify-reset-code", { correo, codigo });

export const resetPassword = (correo, nuevaContraseña, repetirContraseña) =>
  axios.post("/auth/reset-password", { correo, nuevaContraseña, repetirContraseña });

export const logoutRequest = () => axios.post("/auth/logout");
