import { Exemplary } from '../../models/index.js';

export async function updateExemplaryController(req, res) {
  try {
    const { id } = req.params;
    const { codigo, id_libro } = req.body;

    const ejemplar = await Exemplary.findByPk(id);

    if (!ejemplar) {
      return res.status(404).json({ mensaje: 'Ejemplar no encontrado.' });
    }

    ejemplar.codigo = codigo ?? ejemplar.codigo;
    ejemplar.id_libro = id_libro ?? ejemplar.id_libro;

    await ejemplar.save();

    res.status(200).json({ mensaje: 'Ejemplar actualizado correctamente.', ejemplar });
  } catch (error) {
    console.error('Error al actualizar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}