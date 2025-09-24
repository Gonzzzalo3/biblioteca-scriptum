// src/controllers/exemplary/lendExemplary.controller.js

//Este controlador permite registrar el préstamo de un ejemplar previamente reservado.
//La operación solo es válida si el ejemplar existe y su estado actual es `RESERVADO`.
//En ese caso, el estado se actualiza a `PRESTADO`, indicando que el ejemplar ya fue entregado al usuario.
//Si el ejemplar no existe o no está reservado, se devuelve un error 400.
//Si la operación es exitosa, se devuelve el ejemplar actualizado junto con un mensaje de confirmación.

import { Exemplary } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function lendExemplaryController(req, res) {
  try {
    const { id } = req.params;

    //se busca el ejemplar por su ID
    const ejemplar = await Exemplary.findByPk(id);

    //validación: debe existir y estar en estado "reservado"
    if (!ejemplar || ejemplar.estado !== EXEMPLARY_STATUS.RESERVADO) {
      return res.status(400).json({ mensaje: 'Ejemplar no está reservado.' });
    }

    //se actualiza el estado del ejemplar a "prestado"
    ejemplar.estado = EXEMPLARY_STATUS.PRESTADO;

    //guardar cambios en la base de datos
    await ejemplar.save();

    //respuesta exitosa con el ejemplar actualizado
    res.status(200).json({ 
      mensaje: 'Ejemplar prestado correctamente.', 
      ejemplar 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al prestar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}