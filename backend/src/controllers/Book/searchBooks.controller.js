// src/controllers/book/searchBooks.controller.js

//Este controlador permite buscar libros en el sistema a través de la barra de búsqueda.
//El término de búsqueda se recibe por query string (?q=...).
//La búsqueda se realiza en varios campos: título, autor, ISBN y nombre de la categoría.
//Los resultados se devuelven ordenados alfabéticamente por título e incluyen la URL completa de la portada.

import { Book, Category } from '../../models/index.js';
import { Op } from 'sequelize';
import { config } from '../../config/env.js';

export async function searchBooksController(req, res) {
  try {
    const { q } = req.query;

    //validación: el término de búsqueda es obligatorio
    if (!q || q.trim() === "") {
      return res.status(400).json({ mensaje: 'Debe proporcionar un término de búsqueda.' });
    }

    //se obtiene la URL base desde la configuración o desde la request
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan los libros que coincidan con el término en título, autor, ISBN o categoría
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
          { '$Category.nombre$': { [Op.like]: `%${q}%` } } //búsqueda por categoría
        ]
      },
      order: [['titulo', 'ASC']]
    });

    //se transforma cada libro para incluir la URL completa de la portada
    const librosConUrl = libros.map(libro => {
      const data = libro.toJSON();
      return {
        ...data,
        portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
      };
    });

    //respuesta exitosa con la lista de resultados
    res.status(200).json({ libros: librosConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al buscar libros:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}