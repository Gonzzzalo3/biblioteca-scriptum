// src/controllers/suggestion/listAllSuggestion.controller.js

import { Suggestion, User } from '../../models/index.js';

export async function listAllSuggestionController(req, res) {
  try {
    const sugerencias = await Suggestion.findAll({
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ sugerencias });
  } catch (error) {
    console.error('Error al listar todas las sugerencias:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}