import { Comment } from '../../models/index.js';
import { sequelize } from '../../config/db.js';

export async function getBookRatingSummaryController(req, res) {
  try {
    const { id_libro } = req.params;

    const resultado = await Comment.findOne({
      where: { id_libro, visible: true },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('calificacion')), 'promedio'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total']
      ],
      raw: true
    });

    res.status(200).json({
      promedio: parseFloat(resultado.promedio || 0).toFixed(2),
      total: parseInt(resultado.total || 0)
    });
  } catch (error) {
    console.error('Error al obtener resumen de calificaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}