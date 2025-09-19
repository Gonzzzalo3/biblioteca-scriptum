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

const router = express.Router();

router.post('/', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), createSuggestionController);
router.put('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), updateSuggestionController);
router.delete('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), deleteOwnSuggestionController);
router.get('/my', verificarToken, validateUserStatus, authorizeRole(ROLES.CLIENTE), listOwnSuggestionController);
router.get('/', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), listAllSuggestionController);
router.get('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), getSuggestionByIdController);

export default router;