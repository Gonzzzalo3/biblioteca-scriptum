// src/controllers/suggestion/createSuggestion.controller.js

import { Suggestion } from '../../models/index.js';

export async function createSuggestionController(req, res) {
  try {
    const { tipo, detalles } = req.body;
    const id_usuario = req.usuario.id;

    if (!tipo || !detalles || detalles.trim() === '') {
      return res.status(400).json({ mensaje: 'Tipo y detalles son obligatorios.' });
    }

    const nueva = await Suggestion.create({ tipo, detalles, id_usuario });

    res.status(201).json({ mensaje: 'Sugerencia creada correctamente.', sugerencia: nueva });
  } catch (error) {
    console.error('Error al crear sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}