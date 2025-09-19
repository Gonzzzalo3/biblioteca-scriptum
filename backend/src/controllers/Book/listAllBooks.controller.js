// src/controllers/book/listAllBooks.controller.js

import { Book, Category } from '../../models/index.js';

export async function listAllBooksController(req, res) {
  try {
    const libros = await Book.findAll({
      include: {
        model: Category,
        attributes: ['nombre']
      },
      order: [['titulo', 'ASC']]
    });

    res.status(200).json({ libros });
  } catch (error) {
    console.error('Error al listar libros:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}