// src/routes/reservationRoutes.js

import express from 'express';
import { createReservationController } from '../controllers/Reservation/createReservation.controller.js';
import { cancelReservationController } from '../controllers/Reservation/cancelReservation.controller.js';
import { getUserReservationsController } from '../controllers/Reservation/getUserReservations.controller.js';
import { getAllReservationsController } from '../controllers/Reservation/getAllReservations.controller.js';
import { getActiveReservationsController } from '../controllers/Reservation/getActiveReservations.controller.js';
import { lendReservationController } from '../controllers/Reservation/lendReservation.controller.js';
import { returnReservationController } from '../controllers/Reservation/returnReservation.controller.js';
import { getUserReservationHistoryController } from '../controllers/Reservation/getUserReservationHistory.controller.js';
import { getAllReservationHistoryController } from '../controllers/Reservation/getAllReservationsHistory.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

/* ────────────────────────────────
   Rutas para clientes autenticados
   ──────────────────────────────── */

// Crear nueva reservación
router.post(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  createReservationController
);

// Cancelar una reservación activa
router.put(
  '/:id/cancel',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  cancelReservationController
);

// Ver reservaciones activas del usuario
router.get(
  '/mis-reservas',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  getUserReservationsController
);

// Ver historial de reservaciones del usuario
router.get(
  '/historial',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  getUserReservationHistoryController
);

/* ────────────────────────────────
   Rutas para bibliotecarios
   ──────────────────────────────── */

// Ver todas las reservaciones del sistema
router.get(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  getAllReservationsController
);

// Ver solo las reservaciones activas
router.get(
  '/activas',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  getActiveReservationsController
);

// Registrar préstamo de una reservación
router.put(
  '/:id/prestar',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  lendReservationController
);

// Registrar devolución de una reservación
router.put(
  '/:id/devolver',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  returnReservationController
);

// Ver historial completo de reservaciones
router.get(
  '/historial/completo',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  getAllReservationHistoryController
);

export default router;