// src/routes/bookRoutes.js

import express from 'express';
import { getMostPopularBooksController } from '../controllers/Book/getMostPopularBooks.controller.js';
import { getBooksByCategoryController } from '../controllers/Book/getBooksByCategory.controller.js';
import { searchBooksController } from '../controllers/Book/searchBooks.controller.js';
import { getBookDetailController } from '../controllers/Book/getBookDetail.controller.js';
import { createBookController } from '../controllers/Book/createBook.controller.js';
import { updateBookController } from '../controllers/Book/updateBook.controller.js';
import { deleteBookController } from '../controllers/Book/deleteBook.controller.js';
import { listAllBooksController } from '../controllers/Book/listAllBooks.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.get('/popular', getMostPopularBooksController);
router.get('/category/:id_categoria', getBooksByCategoryController);
router.get('/search', searchBooksController);
router.get('/:id', getBookDetailController);

router.post('/', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), createBookController);
router.put('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), updateBookController);
router.delete('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), deleteBookController);
router.get('/', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), listAllBooksController);

export default router;