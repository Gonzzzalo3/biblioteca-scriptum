// src/routes/bookRoutes.js

import express from "express";
import { getMostPopularBooksController } from "../controllers/Book/getMostPopularBooks.controller.js";
import { getBooksByCategoryController } from "../controllers/Book/getBooksByCategory.controller.js";
import { searchBooksController } from "../controllers/Book/searchBooks.controller.js";
import { getBookDetailController } from "../controllers/Book/getBookDetail.controller.js";
import { createBookController } from "../controllers/Book/createBook.controller.js";
import { updateBookController } from "../controllers/Book/updateBook.controller.js";
import { deleteBookController } from "../controllers/Book/deleteBook.controller.js";
import { listAllBooksController } from "../controllers/Book/listAllBooks.controller.js";
import { verificarToken } from "../middlewares/auth.js";
import { validateUserStatus } from "../middlewares/validateUserStatus.js";
import { authorizeRole } from "../middlewares/authRole.js";
import { ROLES } from "../config/constants.js";
import { validateVerificationStatus } from "../middlewares/validateVerificationStatus.js";
import { uploadBookCover } from "../middlewares/uploadBookCover.js";

const router = express.Router();

/* ────────────────────────────────
   Rutas públicas para usuarios verificados
   ──────────────────────────────── */

// Libros más populares
router.get(
  "/popular",
  validateVerificationStatus,
  validateUserStatus,
  getMostPopularBooksController
);

// Libros por categoría
router.get(
  "/category/:id_categoria",
  validateVerificationStatus,
  validateUserStatus,
  getBooksByCategoryController
);

// Búsqueda de libros
router.get(
  "/search",
  validateVerificationStatus,
  validateUserStatus,
  searchBooksController
);

// Detalle de un libro específico
router.get(
  "/:id",
  validateVerificationStatus,
  validateUserStatus,
  getBookDetailController
);

/* ────────────────────────────────
   Rutas protegidas para bibliotecarios
   ──────────────────────────────── */

// Crear nuevo libro (con portada)
router.post(
  "/",
  verificarToken,
  authorizeRole(ROLES.BIBLIOTECARIO),
  uploadBookCover.single("portada"),
  validateVerificationStatus,
  validateUserStatus,
  createBookController
);

// Actualizar libro existente
router.put(
  "/:id",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  uploadBookCover.single("portada"),
  authorizeRole(ROLES.BIBLIOTECARIO),
  updateBookController
);

// Eliminar libro
router.delete(
  "/:id",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  deleteBookController
);

// Listar todos los libros (modo administrativo)
router.get(
  "/",
  verificarToken,
  validateVerificationStatus,
  validateUserStatus,
  authorizeRole(ROLES.BIBLIOTECARIO),
  listAllBooksController
);

export default router;