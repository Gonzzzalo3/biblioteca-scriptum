// src/routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import suggestionRoutes from './suggestionRoutes.js';
import bookRoutes from './bookRoutes.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/suggestion', suggestionRoutes)
router.use('/book', bookRoutes)

export default router;