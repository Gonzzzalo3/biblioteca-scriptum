// src/controllers/suggestion/getSuggestionById.controller.js

//Este controlador permite obtener una sugerencia específica por su ID.
//La consulta incluye:
// - La sugerencia solicitada.
// - Información básica del usuario que la creó (nombres, apellidos, imagen).
//
//Si la sugerencia no existe, se devuelve un error 404.
//Si se encuentra, se devuelve la sugerencia junto con los datos del usuario asociado.

import { Suggestion, User } from '../../models/index.js';

export async function getSuggestionByIdController(req, res) {
  try {
    const { id } = req.params;

    //se busca la sugerencia por su ID, incluyendo datos del usuario que la creó
    const sugerencia = await Suggestion.findByPk(id, {
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      }
    });

    //si no se encuentra la sugerencia, se devuelve error 404
    if (!sugerencia) {
      return res.status(404).json({ mensaje: 'Sugerencia no encontrada.' });
    }

    //respuesta exitosa con la sugerencia encontrada
    res.status(200).json({ sugerencia });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}