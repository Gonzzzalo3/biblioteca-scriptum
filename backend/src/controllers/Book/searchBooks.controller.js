// src/controllers/book/searchBooks.controller.js
import { Book, Category } from '../../models/index.js';
import { Op } from 'sequelize';
import { config } from '../../config/env.js';

export async function searchBooksController(req, res) {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ mensaje: 'Debe proporcionar un término de búsqueda.' });
    }

    // Usar BASE_URL de .env o construirla dinámicamente
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const libros = await Book.findAll({
      include: [
        {
          model: Category,
          attributes: ['nombre'],
          required: false
        }
      ],
      where: {
        [Op.or]: [
          { titulo: { [Op.like]: `%${q}%` } },
          { autor: { [Op.like]: `%${q}%` } },
          { isbn: { [Op.like]: `%${q}%` } },
          { '$Category.nombre$': { [Op.like]: `%${q}%` } } // búsqueda por categoría
        ]
      },
      order: [['titulo', 'ASC']]
    });

    // Convertir a JSON y agregar URL completa a portada
    const librosConUrl = libros.map(libro => {
      const data = libro.toJSON();
      return {
        ...data,
        portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
      };
    });

    res.status(200).json({ libros: librosConUrl });
  } catch (error) {
    console.error('Error al buscar libros:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}