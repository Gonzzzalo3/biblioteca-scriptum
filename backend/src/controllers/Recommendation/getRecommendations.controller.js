import { Recommendation, Book } from '../../models/index.js';

export async function getRecommendationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    const recomendaciones = await Recommendation.findAll({
      where: { id_usuario },
      include: {
        model: Book,
        attributes: ['id', 'titulo', 'autor', 'portada', 'sinopsis']
      }
    });

    res.status(200).json({ recomendaciones });
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}