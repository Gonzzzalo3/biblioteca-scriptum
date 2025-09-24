// src/controllers/comment/restoreComment.controller.js

//Este controlador permite restablecer (volver a mostrar) un comentario previamente desactivado.
//La restauración se realiza cambiando el campo `visible` a `true`. 
//De esta manera, el comentario vuelve a estar disponible en el frontend.
//Si el comentario no existe o ya estaba visible, se devuelve un error 404.

import { Comment } from '../../models/index.js';

export async function restoreCommentController(req, res) {
  try {
    const { id } = req.params;

    //se busca el comentario por su ID
    const comentario = await Comment.findByPk(id);

    //si no existe o ya está visible, se devuelve error
    if (!comentario || comentario.visible) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado o ya visible.' });
    }

    //se marca el comentario como visible nuevamente
    comentario.visible = true;
    await comentario.save();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Comentario restaurado correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al restaurar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}