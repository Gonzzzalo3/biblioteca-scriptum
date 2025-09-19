// src/controllers/category/deleteCategory.controller.js

import { Category } from '../../models/index.js';

export async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;

    const categoria = await Category.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    await categoria.destroy();

    res.status(200).json({ mensaje: 'Categoría eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}