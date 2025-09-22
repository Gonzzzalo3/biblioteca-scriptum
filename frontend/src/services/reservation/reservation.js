// src/services/reservation/reservation.js
import axios from "../axiosInstance";

export const createReservation = (data) =>
  axios.post("/reservation", data);

export const cancelReservation = (id) =>
  axios.put(`/reservation/${id}/cancel`);

export const getUserReservations = () =>
  axios.get("/reservation/mis-reservas");

// ⬅️ Nuevo: historial del usuario
export const getUserReservationHistory = () =>
  axios.get("/reservation/historial");

export const getAllReservations = () =>
  axios.get("/reservation");

export const getActiveReservations = () =>
  axios.get("/reservation/activas");

export const lendReservation = (id) =>
  axios.put(`/reservation/${id}/prestar`);

export const returnReservation = (id) =>
  axios.put(`/reservation/${id}/devolver`);