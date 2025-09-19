// src/routes/exemplaryRoutes.js

import express from 'express';
import { createExemplaryController } from '../controllers/Exemplary/createExemplary.controller.js';
import { updateExemplaryController } from '../controllers/Exemplary/updateExemplary.controller.js';
import { disableExemplaryController } from '../controllers/Exemplary/disableExemplary.controller.js';
import { listAllExemplariesController } from '../controllers/Exemplary/listAllExemplaries.controller.js';
import { lendExemplaryController } from '../controllers/Exemplary/lendExemplary.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.post('/', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), createExemplaryController);
router.put('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), updateExemplaryController);
router.put('/:id/disable', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), disableExemplaryController);
router.put('/:id/lend', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), lendExemplaryController);
router.get('/', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), listAllExemplariesController);

export default router;