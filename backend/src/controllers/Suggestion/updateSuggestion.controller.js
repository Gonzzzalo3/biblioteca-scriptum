// src/controllers/suggestion/updateSuggestion.controller.js

import { Suggestion } from '../../models/index.js';

export async function updateSuggestionController(req, res) {
  try {
    const { id } = req.params;
    const { tipo, detalles } = req.body;
    const id_usuario = req.usuario.id;

    const sugerencia = await Suggestion.findByPk(id);

    if (!sugerencia || sugerencia.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No tienes permiso para editar esta sugerencia.' });
    }

    sugerencia.tipo = tipo ?? sugerencia.tipo;
    sugerencia.detalles = detalles ?? sugerencia.detalles;

    await sugerencia.save();

    res.status(200).json({ mensaje: 'Sugerencia actualizada correctamente.', sugerencia });
  } catch (error) {
    console.error('Error al actualizar sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}