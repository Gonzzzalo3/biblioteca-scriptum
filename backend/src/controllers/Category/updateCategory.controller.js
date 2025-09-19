// src/controllers/category/updateCategory.controller.js

import { Category } from '../../models/index.js';

export async function updateCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await Category.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    categoria.nombre = nombre ?? categoria.nombre;
    categoria.descripcion = descripcion ?? categoria.descripcion;

    await categoria.save();

    res.status(200).json({ mensaje: 'Categoría actualizada correctamente.', categoria });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}