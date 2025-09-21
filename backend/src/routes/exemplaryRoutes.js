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
import { validateVerificationStatus } from '../middlewares/validateVerificationStatus.js';

const router = express.Router();

router.post('/', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), createExemplaryController);
router.put('/:id', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), updateExemplaryController);
router.put('/:id/disable', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), disableExemplaryController);
router.put('/:id/lend', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), lendExemplaryController);
router.get('/', verificarToken, validateVerificationStatus, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), listAllExemplariesController);

export default router;