// src/controllers/comment/createComment.controller.js

//Este controlador permite a un usuario crear un comentario sobre un libro.
//Recibe el ID del libro, el contenido del comentario y una calificación opcional.
//El ID del usuario se obtiene del token (inyectado por el middleware de autenticación).
//Si la creación es exitosa, devuelve el comentario recién registrado junto con un mensaje de confirmación.

import { Comment } from '../../models/index.js';

export async function createCommentController(req, res) {
  try {
    const { id_libro, contenido, calificacion } = req.body;
    const id_usuario = req.usuario.id; //extraído del token por el middleware

    //crear el comentario en la base de datos
    const comentario = await Comment.create({
      id_libro,
      id_usuario,
      contenido,
      calificacion
    });

    //respuesta exitosa con el comentario creado
    res.status(201).json({ 
      mensaje: 'Comentario creado correctamente.', 
      comentario 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al crear comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}