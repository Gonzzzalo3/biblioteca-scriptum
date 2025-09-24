// src/controllers/comment/deleteComment.controller.js

//Este controlador permite a un usuario eliminar uno de sus propios comentarios.
//Primero valida que el comentario exista y que pertenezca al usuario autenticado.
//Si la validación falla, devuelve un error 403 (prohibido).
//Si todo es correcto, elimina el comentario de la base de datos y confirma la operación.

import { Comment } from '../../models/index.js';

export async function deleteCommentController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id; //extraído del token por el middleware

    //se busca el comentario por su ID
    const comentario = await Comment.findByPk(id);

    //si no existe o no pertenece al usuario autenticado, se rechaza la operación
    if (!comentario || comentario.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No puedes eliminar este comentario.' });
    }

    //se elimina el comentario de la base de datos
    await comentario.destroy();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Comentario eliminado correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}