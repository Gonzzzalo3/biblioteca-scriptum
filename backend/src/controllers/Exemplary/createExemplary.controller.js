import { Exemplary } from '../../models/index.js';

export async function createExemplaryController(req, res) {
  try {
    const { id_libro, codigo } = req.body;

    if (!id_libro || !codigo) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const nuevo = await Exemplary.create({ id_libro, codigo });

    res.status(201).json({ mensaje: 'Ejemplar creado correctamente.', ejemplar: nuevo });
  } catch (error) {
    console.error('Error al crear ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}