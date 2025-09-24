// src/controllers/exemplary/updateExemplary.controller.js

//Este controlador permite actualizar la información de un ejemplar específico en el sistema.
//Se recibe el ID del ejemplar como parámetro en la ruta.
//Si el ejemplar no existe, se devuelve un error 404.
//Si existe, se actualizan únicamente los campos enviados en la petición (código y/o id_libro).
//Finalmente, se guardan los cambios en la base de datos y se devuelve el ejemplar actualizado.

import { Exemplary } from '../../models/index.js';

export async function updateExemplaryController(req, res) {
  try {
    const { id } = req.params;
    const { codigo, id_libro } = req.body;

    //se busca el ejemplar por su ID
    const ejemplar = await Exemplary.findByPk(id);

    //si no existe, se devuelve error
    if (!ejemplar) {
      return res.status(404).json({ mensaje: 'Ejemplar no encontrado.' });
    }

    //se actualizan solo los campos enviados en la petición
    ejemplar.codigo = codigo ?? ejemplar.codigo;
    ejemplar.id_libro = id_libro ?? ejemplar.id_libro;

    //guardar cambios en la base de datos
    await ejemplar.save();

    //respuesta exitosa con el ejemplar actualizado
    res.status(200).json({ 
      mensaje: 'Ejemplar actualizado correctamente.', 
      ejemplar 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al actualizar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}