import { Book, Recommendation } from '../../models/index.js';
import { Op } from 'sequelize';

export async function generateRecommendationController(req, res) {
  try {
    const { id_libro } = req.body;
    const id_usuario = req.usuario.id;

    const libroBase = await Book.findByPk(id_libro);
    if (!libroBase) {
      return res.status(404).json({ mensaje: 'Libro base no encontrado.' });
    }

    const librosSimilares = await Book.findAll({
      where: {
        id_categoria: libroBase.id_categoria,
        id: { [Op.ne]: libroBase.id },
        stock: { [Op.gt]: 0 }
      },
      limit: 5
    });

    const recomendaciones = await Promise.all(
      librosSimilares.map(libro =>
        Recommendation.findOrCreate({
          where: { id_usuario, id_libro: libro.id }
        })
      )
    );

    res.status(201).json({
      mensaje: 'Recomendaciones generadas correctamente.',
      recomendaciones: recomendaciones.map(([rec]) => rec)
    });
  } catch (error) {
    console.error('Error al generar recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}