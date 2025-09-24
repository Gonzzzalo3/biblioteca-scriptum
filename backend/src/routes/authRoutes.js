// src/routes/auth.routes.js

import express from 'express';
import { loginController } from '../controllers/Auth/login.controller.js';
import { registerController } from '../controllers/Auth/register.controller.js';
import { verifyController } from '../controllers/Auth/verify.controller.js';
import { forgotPasswordController } from '../controllers/Auth/forgotPassword.controller.js';
import { verifyCodeToResetPassController } from '../controllers/Auth/verifyCodeToResetPass.controller.js';
import { resetPasswordController } from '../controllers/Auth/resetPassword.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { refreshTokenController } from '../controllers/Auth/refreshToken.controller.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { logoutController } from '../controllers/Auth/logout.controller.js';

const router = express.Router();

/* ────────────────────────────────
   Rutas de autenticación y acceso
   ──────────────────────────────── */

// Inicio de sesión
router.post('/login', loginController); // Inicia sesión y genera tokens

// Registro de nuevo usuario
router.post('/register', registerController); // Crea cuenta nueva

// Verificación de cuenta (requiere token y estado válido)
router.post('/verify', validateUserStatus, verificarToken, verifyController); // Confirma correo o código de activación

/* ────────────────────────────────
   Recuperación de contraseña (flujo en 3 pasos)
   ──────────────────────────────── */

router.post('/forgot-password', forgotPasswordController); // Paso 1: solicita código
router.post('/verify-reset-code', verifyCodeToResetPassController); // Paso 2: verifica código
router.post('/reset-password', resetPasswordController); // Paso 3: establece nueva contraseña

/* ────────────────────────────────
   Gestión de sesión
   ──────────────────────────────── */

router.post('/refresh-token', refreshTokenController); // Renueva token de acceso
router.post('/logout', logoutController); // Cierra sesión y elimina token

export default router;