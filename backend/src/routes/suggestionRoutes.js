// src/routes/suggestionRoutes.js

import express from 'express';
import { createSuggestionController } from '../controllers/Suggestion/createSuggestion.controller.js';
import { updateSuggestionController } from '../controllers/Suggestion/updateSuggestion.controller.js';
import { deleteOwnSuggestionController } from '../controllers/Suggestion/deleteOwnSuggestion.controller.js';
import { listOwnSuggestionController } from '../controllers/Suggestion/listOwnSuggestion.controller.js';
import { listAllSuggestionController } from '../controllers/Suggestion/listAllSuggestion.controller.js';
import { getSuggestionByIdController } from '../controllers/Suggestion/getSuggestionById.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

/* ────────────────────────────────
   Rutas para clientes autenticados
   ──────────────────────────────── */

// Crear nueva sugerencia
router.post(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  createSuggestionController
);

// Editar sugerencia propia
router.put(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  updateSuggestionController
);

// Eliminar sugerencia propia
router.delete(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  deleteOwnSuggestionController
);

// Listar todas las sugerencias propias
router.get(
  '/my',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  listOwnSuggestionController
);

/* ────────────────────────────────
   Rutas para bibliotecarios
   ──────────────────────────────── */

// Listar todas las sugerencias del sistema
router.get(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  listAllSuggestionController
);

// Ver detalle de una sugerencia específica
router.get(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  getSuggestionByIdController
);

export default router;