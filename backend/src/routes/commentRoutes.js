// src/routes/commentRoutes.js

import express from 'express';
import { createCommentController } from '../controllers/Comment/createComment.controller.js';
import { editCommentController } from '../controllers/Comment/editComment.controller.js';
import { deleteCommentController } from '../controllers/Comment/deleteComment.controller.js';
import { viewCommentsController } from '../controllers/Comment/viewComments.controller.js';
import { viewOwnCommentsController } from '../controllers/Comment/viewOwnComments.controller.js';
import { disableCommentController } from '../controllers/Comment/disableComment.controller.js';
import { restoreCommentController } from '../controllers/Comment/restoreComment.controller.js';
import { getBookRatingSummaryController } from '../controllers/Comment/getBookRatingSummary.controller.js';

import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

/* ────────────────────────────────
   Rutas administrativas (bibliotecario)
   ──────────────────────────────── */

// Desactivar comentario
router.put(
  '/:id/desactivar',
  verificarToken,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  disableCommentController
);

// Restaurar comentario desactivado
router.put(
  '/:id/restaurar',
  verificarToken,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  restoreCommentController
);

/* ────────────────────────────────
   Rutas públicas (usuarios verificados)
   ──────────────────────────────── */

// Ver comentarios visibles de un libro
router.get(
  '/libro/:id_libro',
  validateUserStatus,
  viewCommentsController
);

// Ver resumen de calificaciones de un libro
router.get(
  '/libro/:id_libro/resumen',
  validateUserStatus,
  getBookRatingSummaryController
);

/* ────────────────────────────────
   Rutas privadas (cliente autenticado)
   ──────────────────────────────── */

// Crear nuevo comentario
router.post(
  '/',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  createCommentController
);

// Editar comentario propio
router.put(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  editCommentController
);

// Eliminar comentario propio
router.delete(
  '/:id',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  deleteCommentController
);

// Ver todos los comentarios propios
router.get(
  '/mis-comentarios',
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.CLIENTE),
  viewOwnCommentsController
);

export default router;