// src/routes/userRoutes.js

import express from 'express';
import { viewProfileController } from '../controllers/User/viewProfile.controller.js';
import { editProfileController } from '../controllers/User/editProfile.controller.js';
import { viewPublicProfileController } from '../controllers/User/viewPublicProfile.controller.js';
import { changePasswordController } from '../controllers/User/changePassword.controller.js';
import { listUsersController } from '../controllers/User/listUsers.controller.js';
import { updateUserStatusController } from '../controllers/User/updateUserStatus.controller.js';
import { deleteProfileController } from '../controllers/User/deleteProfile.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// Public profile (no token required)
router.get('/profile/:id', validateUserStatus, viewPublicProfileController);

// Protected routes (require token + active status)
router.get('/profile', verificarToken, validateUserStatus, viewProfileController);
router.put('/profile', verificarToken, validateUserStatus, editProfileController);
router.put('/change-password', verificarToken, validateUserStatus, changePasswordController);
router.delete('/profile', verificarToken, validateUserStatus, deleteProfileController);

// Admin-only routes (bibliotecario)
router.get('/clients', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), listUsersController);
router.put('/update-status/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), updateUserStatusController);

export default router;