import { Exemplary, Book } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function listAllExemplariesController(req, res) {
  try {
    const ejemplares = await Exemplary.findAll({
      where: { estado: EXEMPLARY_STATUS.DISPONIBLE },
      include: {
        model: Book,
        attributes: ['titulo', 'autor', 'portada']
      },
      order: [['codigo', 'ASC']]
    });

    res.status(200).json({ ejemplares });
  } catch (error) {
    console.error('Error al listar ejemplares:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}