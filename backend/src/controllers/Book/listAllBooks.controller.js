// src/controllers/book/listAllBooks.controller.js
import { Book, Category } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function listAllBooksController(req, res) {
  try {
    // Usar BASE_URL de .env o construirla dinámicamente
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const libros = await Book.findAll({
      include: {
        model: Category,
        attributes: ['nombre']
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
    console.error('Error al listar libros:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}