import express from 'express';
import { loginController } from '../controllers/Auth/login.controller.js';
import { registerController } from '../controllers/Auth/register.controller.js';
import { verifyController } from '../controllers/Auth/verify.controller.js';
import { forgotPasswordController } from '../controllers/Auth/forgotPassword.controller.js';
import { verifyCodeToResetPassController } from '../controllers/Auth/verifyCodeToResetPass.controller.js';
import { resetPasswordController } from '../controllers/Auth/resetPassword.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { refreshTokenController } from '../controllers/Auth/refreshToken.controller.js';


const router = express.Router();

// Autenticación
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/verify', verificarToken, verifyController);

// Recuperación de contraseña
router.post('/forgot-password', forgotPasswordController); // Paso 1
router.post('/verify-reset-code', verifyCodeToResetPassController); // Paso 2
router.post('/reset-password', resetPasswordController); // Paso 3

// token que actualiza
router.post('/refresh-token', refreshTokenController);

export default router;