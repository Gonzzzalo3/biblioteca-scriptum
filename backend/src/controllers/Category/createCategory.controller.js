// src/controllers/category/createCategory.controller.js

import { Category } from '../../models/index.js';

export async function createCategoryController(req, res) {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio.' });
    }

    const nuevaCategoria = await Category.create({ nombre, descripcion });

    res.status(201).json({ mensaje: 'Categoría creada correctamente.', categoria: nuevaCategoria });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}