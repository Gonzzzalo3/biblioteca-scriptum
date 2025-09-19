// src/controllers/suggestion/listOwnSuggestion.controller.js

import { Suggestion, User } from '../../models/index.js';

export async function listOwnSuggestionController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    const sugerencias = await Suggestion.findAll({
      where: { id_usuario },
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ sugerencias });
  } catch (error) {
    console.error('Error al listar sugerencias propias:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}