import { Book, Recommendation } from '../../models/index.js';
import { Op } from 'sequelize';

export async function generateRecommendationController(req, res) {
  try {
    const { id_libro } = req.body;
    const id_usuario = req.usuario?.id;

    if (!id_usuario) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado.' });
    }

    if (!id_libro) {
      return res.status(400).json({ mensaje: 'Falta el id_libro en la solicitud.' });
    }

    const libroBase = await Book.findByPk(id_libro);
    if (!libroBase) {
      return res.status(404).json({ mensaje: 'Libro base no encontrado.' });
    }

    // Buscar libros similares en la misma categoría, excluyendo el actual
    const librosSimilares = await Book.findAll({
      where: {
        id_categoria: libroBase.id_categoria,
        id: { [Op.ne]: libroBase.id },
        stock: { [Op.gt]: 0 }
      },
      limit: 5
    });

    if (!librosSimilares.length) {
      return res.status(200).json({
        mensaje: 'No hay libros similares disponibles para recomendar.',
        recomendaciones: []
      });
    }

    // Crear o encontrar recomendaciones
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