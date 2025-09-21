// src/routes/reservationRoutes.js

import express from 'express';
import { createReservationController } from '../controllers/Reservation/createReservation.controller.js';
import { cancelReservationController } from '../controllers/Reservation/cancelReservation.controller.js';
import { getUserReservationsController } from '../controllers/Reservation/getUserReservations.controller.js';
import { getAllReservationsController } from '../controllers/Reservation/getAllReservations.controller.js';
import { getActiveReservationsController } from '../controllers/Reservation/getActiveReservations.controller.js';
import { lendReservationController } from '../controllers/Reservation/lendReservation.controller.js';
import { returnReservationController } from '../controllers/Reservation/returnReservation.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

// Cliente
router.post('/', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.CLIENTE), createReservationController);
router.put('/:id/cancel', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.CLIENTE), cancelReservationController);
router.get('/mis-reservas', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.CLIENTE), getUserReservationsController);

// Bibliotecario
router.get('/', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), getAllReservationsController);
router.get('/activas', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), getActiveReservationsController);
router.put('/:id/prestar', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), lendReservationController);
router.put('/:id/devolver', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), returnReservationController);

export default router;