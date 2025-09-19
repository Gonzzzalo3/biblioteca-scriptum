import { Exemplary } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function disableExemplaryController(req, res) {
  try {
    const { id } = req.params;

    const ejemplar = await Exemplary.findByPk(id);

    if (!ejemplar) {
      return res.status(404).json({ mensaje: 'Ejemplar no encontrado.' });
    }

    ejemplar.estado = EXEMPLARY_STATUS.NO_DISPONIBLE;

    await ejemplar.save();

    res.status(200).json({ mensaje: 'Ejemplar inhabilitado correctamente.', ejemplar });
  } catch (error) {
    console.error('Error al inhabilitar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}