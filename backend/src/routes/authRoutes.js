// src/routes/authRoutes.js

import express from 'express';
import { loginController } from '../controllers/Auth/login.controller.js'

const router = express.Router();

router.post('/login', loginController);

export default router;