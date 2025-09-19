// src/controllers/book/getBookDetail.controller.js

import { Book, Category } from '../../models/index.js';

export async function getBookDetailController(req, res) {
  try {
    const { id } = req.params;

    const libro = await Book.findByPk(id, {
      include: {
        model: Category,
        attributes: ['nombre']
      }
    });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    res.status(200).json({ libro });
  } catch (error) {
    console.error('Error al obtener detalles del libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}