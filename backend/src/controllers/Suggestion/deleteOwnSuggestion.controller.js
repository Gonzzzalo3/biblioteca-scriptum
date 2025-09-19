// src/controllers/suggestion/deleteOwnSuggestion.controller.js

import { Suggestion } from '../../models/index.js';

export async function deleteOwnSuggestionController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    const sugerencia = await Suggestion.findByPk(id);

    if (!sugerencia || sugerencia.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta sugerencia.' });
    }

    await sugerencia.destroy();

    res.status(200).json({ mensaje: 'Sugerencia eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}