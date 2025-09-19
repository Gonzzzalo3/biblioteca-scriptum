// src/routes/authRoutes.js

import express from 'express';
import { loginController } from '../controllers/Auth/login.controller.js'
import { registerController } from '../controllers/Auth/register.controller.js';
import { verifyController } from '../controllers/Auth/verify.controller.js';
import { verificarToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/verify',verificarToken ,verifyController);

export default router;