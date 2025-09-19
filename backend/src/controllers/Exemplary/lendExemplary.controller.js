import { Exemplary } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function lendExemplaryController(req, res) {
  try {
    const { id } = req.params;

    const ejemplar = await Exemplary.findByPk(id);

    if (!ejemplar || ejemplar.estado !== EXEMPLARY_STATUS.RESERVADO) {
      return res.status(400).json({ mensaje: 'Ejemplar no está reservado.' });
    }

    ejemplar.estado = EXEMPLARY_STATUS.PRESTADO;

    await ejemplar.save();

    res.status(200).json({ mensaje: 'Ejemplar prestado correctamente.', ejemplar });
  } catch (error) {
    console.error('Error al prestar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}