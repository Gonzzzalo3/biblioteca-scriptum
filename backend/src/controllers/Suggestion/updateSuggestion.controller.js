// src/controllers/suggestion/updateSuggestion.controller.js

//Este controlador permite a un usuario autenticado actualizar una de sus propias sugerencias.
//La lógica incluye:
// - Verificar que la sugerencia exista en la base de datos.
// - Confirmar que la sugerencia pertenezca al usuario autenticado (comparando `id_usuario`).
// - Actualizar únicamente los campos enviados en la petición (`tipo` y/o `detalles`),
//   manteniendo los valores anteriores si no se proporcionan nuevos.
//Si la validación es correcta, se guardan los cambios en la base de datos.
//Finalmente, se devuelve la sugerencia actualizada junto con un mensaje de confirmación.

import { Suggestion } from '../../models/index.js';

export async function updateSuggestionController(req, res) {
  try {
    const { id } = req.params;
    const { tipo, detalles } = req.body;
    const id_usuario = req.usuario.id;

    //se busca la sugerencia por su ID
    const sugerencia = await Suggestion.findByPk(id);

    //validación: debe existir y pertenecer al usuario autenticado
    if (!sugerencia || sugerencia.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No tienes permiso para editar esta sugerencia.' });
    }

    //actualizar solo los campos enviados en la petición
    sugerencia.tipo = tipo ?? sugerencia.tipo;
    sugerencia.detalles = detalles ?? sugerencia.detalles;

    //guardar cambios en la base de datos
    await sugerencia.save();

    //respuesta exitosa con la sugerencia actualizada
    res.status(200).json({ 
      mensaje: 'Sugerencia actualizada correctamente.', 
      sugerencia 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al actualizar sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}