import { Recommendation, Reservation, Exemplary } from '../../models/index.js';
import { Op } from 'sequelize';

export async function clearOldRecommendationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    // Obtener los ejemplares reservados por el usuario, incluyendo el libro asociado
    const reservas = await Reservation.findAll({
      where: { id_usuario },
      include: {
        model: Exemplary,
        attributes: ['id_libro']
      }
    });

    // Extraer los IDs de libros reservados
    const librosReservados = reservas
      .map(r => r.Exemplary?.id_libro)
      .filter(Boolean); // Elimina valores nulos o undefined

    if (librosReservados.length === 0) {
      return res.status(200).json({
        mensaje: 'No hay recomendaciones obsoletas para eliminar.',
        eliminadas: 0
      });
    }

    // Eliminar recomendaciones que ya fueron reservadas
    const eliminadas = await Recommendation.destroy({
      where: {
        id_usuario,
        id_libro: { [Op.in]: librosReservados }
      }
    });

    res.status(200).json({
      mensaje: 'Recomendaciones obsoletas eliminadas correctamente.',
      eliminadas
    });
  } catch (error) {
    console.error('Error al limpiar recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}