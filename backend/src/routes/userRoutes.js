// src/routes/userRoutes.js

import express from 'express';
import { viewProfileController } from '../controllers/User/viewProfile.controller.js';
import { editProfileController } from '../controllers/User/editProfile.controller.js';
import { viewPublicProfileController } from '../controllers/User/viewPublicProfile.controller.js';
import { changePasswordController } from '../controllers/User/changePassword.controller.js';
import { listUsersController } from '../controllers/User/listUsers.controller.js';
import { updateUserStatusController } from '../controllers/User/updateUserStatus.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';
import { deleteProfileController } from '../controllers/User/deleteProfile.controller.js';

const router = express.Router();

// Ver perfil propio
router.get('/profile', verificarToken, viewProfileController);

// Editar perfil propio
router.put('/profile', verificarToken, editProfileController);

// Ver perfil público de otro usuario
router.get('/profile/:id', viewPublicProfileController);

// Cambiar contraseña
router.put('/change-password', verificarToken, changePasswordController);

router.delete('/profile', verificarToken, deleteProfileController);


//funcionalidades del bibliotecario
router.get('/clients', verificarToken, authorizeRole(ROLES.BIBLIOTECARIO), listUsersController);
router.put('/update-status/:id', verificarToken, authorizeRole(ROLES.BIBLIOTECARIO), updateUserStatusController);

export default router;