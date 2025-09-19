// src/controllers/category/listAllCategories.controller.js

import { Category } from '../../models/index.js';

export async function listAllCategoriesController(req, res) {
  try {
    const categorias = await Category.findAll({
      attributes: ['id', 'nombre', 'descripcion'],
      order: [['nombre', 'ASC']]
    });

    res.status(200).json({ categorias });
  } catch (error) {
    console.error('Error al listar categorías:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}