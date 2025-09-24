// src/controllers/comment/disableComment.controller.js

//Este controlador permite desactivar (ocultar) un comentario sin eliminarlo de la base de datos.
//La desactivación se realiza cambiando el campo `visible` a `false`. 
//De esta manera, el comentario deja de mostrarse en el frontend pero se conserva para auditoría o historial.
//Si el comentario no existe o ya estaba desactivado, se devuelve un error 404.

import { Comment } from '../../models/index.js';

export async function disableCommentController(req, res) {
  try {
    const { id } = req.params;

    //se busca el comentario por su ID
    const comentario = await Comment.findByPk(id);

    //si no existe o ya está desactivado, se devuelve error
    if (!comentario || !comentario.visible) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado o ya desactivado.' });
    }

    //se marca el comentario como no visible
    comentario.visible = false;
    await comentario.save();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Comentario desactivado correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al desactivar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}