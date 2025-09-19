// src/controllers/book/getBooksByCategory.controller.js

import { Book, Category } from '../../models/index.js';

export async function getBooksByCategoryController(req, res) {
  try {
    const { id_categoria } = req.params;

    const libros = await Book.findAll({
      where: { id_categoria },
      include: {
        model: Category,
        attributes: ['nombre']
      },
      order: [['titulo', 'ASC']]
    });

    res.status(200).json({ libros });
  } catch (error) {
    console.error('Error al obtener libros por categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}