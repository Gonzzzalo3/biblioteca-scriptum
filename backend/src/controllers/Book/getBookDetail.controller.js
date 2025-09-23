// src/controllers/book/getBookDetail.controller.js
import { Book, Category, Exemplary } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getBookDetailController(req, res) {
  try {
    const { id } = req.params;

  
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const libro = await Book.findByPk(id, {
      include: [
        { model: Category, attributes: ['nombre'] },
        { model: Exemplary, attributes: ['id', 'estado'] }
      ]
    });

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    // Convertir a JSON y agregar URL completa a portada
    const data = libro.toJSON();
    const libroConUrl = {
      ...data,
      portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
    };

    res.status(200).json({ libro: libroConUrl });
  } catch (error) {
    console.error('Error al obtener detalles del libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}