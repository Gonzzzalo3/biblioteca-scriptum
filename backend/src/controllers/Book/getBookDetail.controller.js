// src/controllers/book/getBookDetail.controller.js

//Este controlador obtiene el detalle completo de un libro específico.
//Se recibe el ID del libro como parámetro en la ruta. 
//La consulta incluye la categoría asociada y los ejemplares disponibles,
//devolviendo además la URL completa de la portada para que el frontend pueda mostrarla.

import { Book, Category, Exemplary } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getBookDetailController(req, res) {
  try {
    const { id } = req.params;

    //se obtiene la URL base desde la configuración o desde la request
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se busca el libro por su ID, incluyendo categoría y ejemplares
    const libro = await Book.findByPk(id, {
      include: [
        { model: Category, attributes: ['nombre'] },
        { model: Exemplary, attributes: ['id', 'estado'] }
      ]
    });

    //si no existe, se devuelve error
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    //se transforma el libro a JSON y se agrega la URL completa de la portada
    const data = libro.toJSON();
    const libroConUrl = {
      ...data,
      portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
    };

    //respuesta exitosa con el detalle del libro
    res.status(200).json({ libro: libroConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener detalles del libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}