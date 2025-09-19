// src/controllers/book/searchBooks.controller.js

import { Book } from '../../models/index.js';
import { Op } from 'sequelize';

export async function searchBooksController(req, res) {
  try {
    const { q } = req.query;

    const libros = await Book.findAll({
      where: {
        [Op.or]: [
          { titulo: { [Op.like]: `%${q}%` } },
          { autor: { [Op.like]: `%${q}%` } },
          { isbn: { [Op.like]: `%${q}%` } }
        ]
      },
      order: [['titulo', 'ASC']]
    });

    res.status(200).json({ libros });
  } catch (error) {
    console.error('Error al buscar libros:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}