// src/controllers/recommendation/getRecommendations.controller.js
import { Recommendation, Book } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getRecommendationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const recomendaciones = await Recommendation.findAll({
      where: { id_usuario },
      include: {
        model: Book,
        attributes: ['id', 'titulo', 'autor', 'portada', 'sinopsis']
      },
      limit: 4
    });

    const recomendacionesConUrl = recomendaciones.map(rec => {
      const data = rec.toJSON();
      return {
        ...data,
        Book: data.Book
          ? {
              ...data.Book,
              portadaUrl: data.Book.portada
                ? `${baseUrl}${data.Book.portada}`
                : null
            }
          : null
      };
    });

    res.status(200).json({ recomendaciones: recomendacionesConUrl });
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}