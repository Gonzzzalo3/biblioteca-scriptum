// src/controllers/suggestion/getSuggestionById.controller.js

import { Suggestion, User } from '../../models/index.js';

export async function getSuggestionByIdController(req, res) {
  try {
    const { id } = req.params;

    const sugerencia = await Suggestion.findByPk(id, {
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      }
    });

    if (!sugerencia) {
      return res.status(404).json({ mensaje: 'Sugerencia no encontrada.' });
    }

    res.status(200).json({ sugerencia });
  } catch (error) {
    console.error('Error al obtener sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}