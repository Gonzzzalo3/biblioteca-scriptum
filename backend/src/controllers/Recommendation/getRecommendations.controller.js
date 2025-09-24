// src/controllers/recommendation/getRecommendations.controller.js

//Este controlador permite obtener las recomendaciones de libros generadas para un usuario autenticado.
//La consulta busca las recomendaciones asociadas al usuario, incluyendo información del libro recomendado
//(id, título, autor, portada y sinopsis) y la categoría a la que pertenece dicho libro.
//Se limita el resultado a un máximo de 4 recomendaciones.
//Además, se construye la URL completa de la portada del libro, devolviendo `null` si no existe,
//y se añade el nombre de la categoría o "Sin categoría" en caso de no estar definida.
//Si la operación es exitosa, se devuelve la lista de recomendaciones enriquecida para el frontend.

import { Recommendation, Book, Category } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getRecommendationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan las recomendaciones del usuario, incluyendo datos del libro y su categoría
    const recomendaciones = await Recommendation.findAll({
      where: { id_usuario },
      include: {
        model: Book,
        attributes: ['id', 'titulo', 'autor', 'portada', 'sinopsis'],
        include: {
          model: Category,
          attributes: ['nombre']
        }
      },
      limit: 4 //máximo de 4 recomendaciones
    });

    //se transforma cada recomendación para incluir la URL completa de la portada y el nombre de la categoría
    const recomendacionesConUrl = recomendaciones.map(rec => {
      const data = rec.toJSON();
      return {
        ...data,
        Book: data.Book
          ? {
              ...data.Book,
              portadaUrl: data.Book.portada
                ? `${baseUrl}${data.Book.portada}`
                : null,
              category: data.Book.Category?.nombre || "Sin categoría"
            }
          : null
      };
    });

    //respuesta exitosa con la lista de recomendaciones enriquecida
    res.status(200).json({ recomendaciones: recomendacionesConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}