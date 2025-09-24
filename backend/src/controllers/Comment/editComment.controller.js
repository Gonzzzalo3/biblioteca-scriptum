// src/controllers/comment/editComment.controller.js

//Este controlador permite a un usuario editar uno de sus propios comentarios.
//Primero valida que el comentario exista y que pertenezca al usuario autenticado.
//Si la validación falla, devuelve un error 403 (prohibido).
//Si todo es correcto, actualiza el contenido y/o la calificación del comentario
//y guarda los cambios en la base de datos.

import { Comment } from '../../models/index.js';

export async function editCommentController(req, res) {
  try {
    const { id } = req.params;
    const { contenido, calificacion } = req.body;
    const id_usuario = req.usuario.id; //extraído del token por el middleware

    //se busca el comentario por su ID
    const comentario = await Comment.findByPk(id);

    //si no existe o no pertenece al usuario autenticado, se rechaza la operación
    if (!comentario || comentario.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No puedes editar este comentario.' });
    }

    //se actualizan los campos editables
    comentario.contenido = contenido;
    comentario.calificacion = calificacion;

    //guardar cambios en la base de datos
    await comentario.save();

    //respuesta exitosa con el comentario actualizado
    res.status(200).json({ 
      mensaje: 'Comentario actualizado correctamente.', 
      comentario 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al editar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}