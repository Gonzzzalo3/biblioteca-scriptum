// src/routes/recommendationRoutes.js

import express from 'express';
import { generateRecommendationController } from '../controllers/Recommendation/generateRecommendation.controller.js';
import { getRecommendationsController } from '../controllers/Recommendation/getRecommendations.controller.js';
import { clearOldRecommendationsController } from '../controllers/Recommendation/clearOldRecommendations.controller.js';

import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

/* ────────────────────────────────
   Rutas de recomendaciones (cliente autenticado)
   ──────────────────────────────── */

// Generar recomendaciones personalizadas (al visitar o reservar un libro)
router.post(
  '/generate',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  generateRecommendationController
);

// Ver recomendaciones activas del usuario
router.get(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  getRecommendationsController
);

// Limpiar recomendaciones obsoletas (libros ya reservados)
router.delete(
  '/clear',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  clearOldRecommendationsController
);

export default router;