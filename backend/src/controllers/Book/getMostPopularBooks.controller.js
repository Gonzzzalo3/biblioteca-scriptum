// src/controllers/book/getMostPopularBooks.controller.js

import { Book } from '../../models/index.js';
import { sequelize } from '../../config/db.js';

export async function getMostPopularBooksController(req, res) {
  try {
    const libros = await Book.findAll({
      attributes: {
        include: [
          [sequelize.literal(`(
            SELECT COUNT(*) FROM recommendations WHERE recommendations.id_libro = Book.id
          )`), 'recomendaciones']
        ]
      },
      order: [[sequelize.literal('recomendaciones'), 'DESC']],
      limit: 10
    });

    res.status(200).json({ libros });
  } catch (error) {
    console.error('Error al obtener libros populares:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}