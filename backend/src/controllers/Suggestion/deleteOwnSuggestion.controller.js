// src/controllers/suggestion/deleteOwnSuggestion.controller.js

//Este controlador permite a un usuario autenticado eliminar una de sus propias sugerencias.
//La lógica incluye:
// - Verificar que la sugerencia exista en la base de datos.
// - Confirmar que la sugerencia pertenezca al usuario autenticado (comparando `id_usuario`).
//Si la sugerencia no existe o no pertenece al usuario, se devuelve un error 403 (prohibido).
//Si la validación es correcta, se elimina la sugerencia de la base de datos.
//Finalmente, se devuelve un mensaje de confirmación indicando que la sugerencia fue eliminada.

import { Suggestion } from '../../models/index.js';

export async function deleteOwnSuggestionController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    //se busca la sugerencia por su ID
    const sugerencia = await Suggestion.findByPk(id);

    //validación: debe existir y pertenecer al usuario autenticado
    if (!sugerencia || sugerencia.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta sugerencia.' });
    }

    //eliminar la sugerencia de la base de datos
    await sugerencia.destroy();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Sugerencia eliminada correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al eliminar sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}