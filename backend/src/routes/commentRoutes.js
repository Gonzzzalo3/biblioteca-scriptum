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

const router = express.Router();


// Bibliotecario
router.put('/:id/desactivar', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), disableCommentController);
router.put('/:id/restaurar', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), restoreCommentController);

// Público / Cliente
router.get('/libro/:id_libro', viewCommentsController); // Ver comentarios visibles de un libro
router.get('/libro/:id_libro/resumen', getBookRatingSummaryController); // Ver resumen de calificaciones

// Cliente autenticado
router.post('/', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), createCommentController);
router.put('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), editCommentController);
router.delete('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), deleteCommentController);
router.get('/mis-comentarios', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), viewOwnCommentsController);

export default router;