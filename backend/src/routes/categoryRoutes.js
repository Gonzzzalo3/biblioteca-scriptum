// src/routes/categoryRoutes.js

import express from 'express';
import { createCategoryController } from '../controllers/Category/createCategory.controller.js';
import { deleteCategoryController } from '../controllers/Category/deleteCategory.controller.js';
import { updateCategoryController } from '../controllers/Category/updateCategory.controller.js';
import { listAllCategoriesController } from '../controllers/Category/listAllCategories.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

/* ────────────────────────────────
   Rutas de gestión de categorías
   ──────────────────────────────── */

// Listar todas las categorías (visible para usuarios verificados)
router.get('/', validateUserStatus, listAllCategoriesController);

// Crear nueva categoría (solo bibliotecarios)
router.post(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  createCategoryController
);

// Actualizar categoría existente (solo bibliotecarios)
router.put(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  updateCategoryController
);

// Eliminar categoría (solo bibliotecarios)
router.delete(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  deleteCategoryController
);

export default router;