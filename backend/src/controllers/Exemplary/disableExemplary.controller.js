// src/controllers/exemplary/disableExemplary.controller.js

//Este controlador permite inhabilitar un ejemplar específico de un libro en el sistema.
//La inhabilitación se realiza cambiando su estado a `NO_DISPONIBLE`, 
//lo que indica que ya no puede ser prestado ni reservado.
//Si el ejemplar no existe, se devuelve un error 404. 
//Si la operación es exitosa, se devuelve el ejemplar actualizado junto con un mensaje de confirmación.

import { Exemplary } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function disableExemplaryController(req, res) {
  try {
    const { id } = req.params;

    //se busca el ejemplar por su ID
    const ejemplar = await Exemplary.findByPk(id);

    //si no existe, se devuelve error
    if (!ejemplar) {
      return res.status(404).json({ mensaje: 'Ejemplar no encontrado.' });
    }

    //se actualiza el estado del ejemplar a "no disponible"
    ejemplar.estado = EXEMPLARY_STATUS.NO_DISPONIBLE;

    //guardar cambios en la base de datos
    await ejemplar.save();

    //respuesta exitosa con el ejemplar actualizado
    res.status(200).json({ 
      mensaje: 'Ejemplar inhabilitado correctamente.', 
      ejemplar 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al inhabilitar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}