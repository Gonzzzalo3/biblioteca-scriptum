import axios from "../axiosInstance"; // Instancia con baseURL dinámica y token gestionado automáticamente

// Crea una nueva reserva para el usuario autenticado
export const createReservation = (data) =>
  axios.post("/reservation", data);

// Cancela una reserva existente por ID
export const cancelReservation = (id) =>
  axios.put(`/reservation/${id}/cancel`);

// Obtiene todas las reservas activas del usuario autenticado
export const getUserReservations = () =>
  axios.get("/reservation/mis-reservas");

// Obtiene el historial de reservas del usuario autenticado
export const getUserReservationHistory = () =>
  axios.get("/reservation/historial");

// Obtiene todas las reservas del sistema (uso administrativo)
export const getAllReservations = () =>
  axios.get("/reservation");

// Obtiene todas las reservas activas (uso administrativo)
export const getActiveReservations = () =>
  axios.get("/reservation/activas");

// Confirma el préstamo de una reserva por ID
export const lendReservation = (id) =>
  axios.put(`/reservation/${id}/prestar`);

// Confirma la devolución de una reserva por ID
export const returnReservation = (id) =>
  axios.put(`/reservation/${id}/devolver`);

// Obtiene el historial completo de reservas (todas las acciones)
export const getAllReservationHistory = () =>
  axios.get("/reservation/historial/completo");