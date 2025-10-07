import axios from "../axiosInstance"; // Instancia configurada con baseURL y token automático

// Servicio de inicio de sesión
export const login = (credentials) =>
  axios.post("/auth/login", credentials);

// Servicio de registro de nuevo usuario
export const register = (userData) =>
  axios.post("/auth/register", userData);

// Verificación de cuenta mediante código enviado por correo
export const verifyAccount = (codigo) =>
  axios.post("/auth/verify", { codigo });

// Solicita renovación del token de acceso (usado internamente por interceptores)
export const refreshToken = () =>
  axios.post("/auth/refresh-token");

// Solicita código de recuperación de contraseña
export const forgotPassword = (correo) =>
  axios.post("/auth/forgot-password", { correo });

// Verifica el código de recuperación enviado al correo
export const verifyResetCode = (correo, codigo) =>
  axios.post("/auth/verify-reset-code", { correo, codigo });

// Restablece la contraseña usando el código verificado
export const resetPassword = (correo, nuevaContraseña, repetirContraseña) =>
  axios.post("/auth/reset-password", {
    correo,
    nuevaContraseña,
    repetirContraseña,
  });

// Cierra sesión del usuario y elimina cookies de sesión
export const logoutRequest = () =>
  axios.post("/auth/logout");