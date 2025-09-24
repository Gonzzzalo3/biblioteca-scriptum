// src/controllers/exemplary/listAllExemplaries.controller.js

//Este controlador permite obtener la lista de todos los ejemplares disponibles en el sistema.
//La consulta filtra únicamente los ejemplares cuyo estado es `DISPONIBLE`.
//Además, incluye información básica del libro al que pertenece cada ejemplar (título, autor, portada).
//Los resultados se devuelven ordenados por el código del ejemplar en orden ascendente.
//Si la operación es exitosa, se devuelve la lista de ejemplares disponibles.
//En caso de error inesperado, se devuelve un mensaje de error 500.

import { Exemplary, Book } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function listAllExemplariesController(req, res) {
  try {
    //se buscan todos los ejemplares con estado "disponible"
    const ejemplares = await Exemplary.findAll({
      where: { estado: EXEMPLARY_STATUS.DISPONIBLE },
      include: {
        model: Book,
        attributes: ['titulo', 'autor', 'portada']
      },
      order: [['codigo', 'ASC']] //ordenar por código ascendente
    });

    //respuesta exitosa con la lista de ejemplares disponibles
    res.status(200).json({ ejemplares });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al listar ejemplares:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}