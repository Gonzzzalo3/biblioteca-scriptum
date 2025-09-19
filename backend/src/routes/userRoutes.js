// src/routes/userRoutes.js

import express from 'express';
import { viewProfileController } from '../controllers/User/viewProfile.controller.js';
import { editProfileController } from '../controllers/User/editProfile.controller.js';
import { viewPublicProfileController } from '../controllers/User/viewPublicProfile.controller.js';
import { changePasswordController } from '../controllers/User/changePassword.controller.js';
import { verificarToken } from '../middlewares/auth.js';

const router = express.Router();

// Ver perfil propio
router.get('/profile', verificarToken, viewProfileController);

// Editar perfil propio
router.put('/profile', verificarToken, editProfileController);

// Ver perfil público de otro usuario
router.get('/profile/:id', verificarToken, viewPublicProfileController);

// Cambiar contraseña
router.put('/change-password', verificarToken, changePasswordController);

export default router;