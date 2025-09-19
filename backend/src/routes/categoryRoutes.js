// src/routes/categoryRoutes.js

import express from 'express';
import { createCategoryController } from '../controllers/Category/createCategory.controller.js';
import { deleteCategoryController } from '../controllers/Category/deleteCategory.controller.js';
import { updateCategoryController } from '../controllers/Category/updateCategory.controller.js';
import { listAllCategoriesController } from '../controllers/Category/listAllCategories.controller.js';
import { verificarToken } from '../middlewares/auth.js';
import { validateUserStatus } from '../middlewares/validateUserStatus.js';
import { authorizeRole } from '../middlewares/authRole.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

router.get('/', listAllCategoriesController);

router.post('/', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), createCategoryController);
router.put('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), updateCategoryController);
router.delete('/:id', verificarToken, validateUserStatus, authorizeRole(ROLES.BIBLIOTECARIO), deleteCategoryController);

export default router;