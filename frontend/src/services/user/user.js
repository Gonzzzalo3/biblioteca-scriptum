import axios from "../axiosInstance"; // Instancia con baseURL dinámica y token gestionado automáticamente

// Obtiene el perfil público de un usuario por ID (no requiere autenticación)
export const getPublicProfile = (id) =>
  axios.get(`/user/profile/${id}`);

// Obtiene el perfil privado del usuario autenticado
export const getMyProfile = () =>
  axios.get("/user/profile");

// Actualiza los datos del perfil privado del usuario autenticado
export const updateMyProfile = (data) =>
  axios.put("/user/profile", data);

// Cambia la contraseña del usuario autenticado
export const changeMyPassword = (actual, nueva, repetir) =>
  axios.put("/user/change-password", { actual, nueva, repetir });

// Elimina (desactiva) la cuenta del usuario autenticado
export const deleteMyProfile = (contraseña) =>
  axios.delete("/user/profile", { data: { contraseña } });

// Obtiene la lista de clientes registrados (uso administrativo)
export const listClients = () =>
  axios.get("/user/clients");

// Actualiza el estado de un usuario (activo, suspendido, etc.) por ID (uso administrativo)
export const updateUserStatus = (id, accion) =>
  axios.put(`/user/update-status/${id}`, { accion });

// Obtiene todos los usuarios junto con su estado actual (uso administrativo)
export const getAllUsersWithStatus = () =>
  axios.get("/user/usuarios/status");