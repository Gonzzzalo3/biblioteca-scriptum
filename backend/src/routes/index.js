// src/routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import suggestionRoutes from './suggestionRoutes.js';
import bookRoutes from './bookRoutes.js';
import exemplaryRoutes from './exemplaryRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import commentRoutes from './commentRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';

const router = express.Router();

/* ────────────────────────────────
   Registro de rutas por módulo
   ──────────────────────────────── */

// Autenticación y acceso
router.use('/auth', authRoutes);

// Gestión de usuarios
router.use('/user', userRoutes);

// Categorías de libros
router.use('/category', categoryRoutes);

// Sugerencias de usuarios
router.use('/suggestion', suggestionRoutes);

// Libros y catálogo
router.use('/book', bookRoutes);

// Ejemplares físicos
router.use('/exemplary', exemplaryRoutes);

// Reservaciones y préstamos
router.use('/reservation', reservationRoutes);

// Comentarios y calificaciones
router.use('/comment', commentRoutes);

// Recomendaciones personalizadas
router.use('/recommendation', recommendationRoutes);

export default router;