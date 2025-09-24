// src/controllers/comment/viewComments.controller.js

//Este controlador permite obtener todos los comentarios visibles de un libro específico.
//Se recibe el ID del libro como parámetro en la ruta. 
//La consulta incluye los datos básicos del usuario que realizó el comentario (nombres, apellidos, imagen).
//Los comentarios se devuelven ordenados por fecha de creación (más recientes primero).
//Además, se construye la URL completa de la imagen del usuario, asignando una imagen por defecto
//si el usuario no tiene foto registrada.

import { Comment, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function viewCommentsController(req, res) {
  try {
    const { id_libro } = req.params;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan los comentarios visibles del libro, incluyendo datos del usuario
    const comentarios = await Comment.findAll({
      where: { id_libro, visible: true },
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //se transforma cada comentario para incluir la URL completa de la imagen del usuario
    const comentariosConUrl = comentarios.map(c => {
      const data = c.toJSON();
      const imgRelativa = data.User?.img?.startsWith('/')
        ? data.User.img
        : `/${data.User?.img || ''}`;

      return {
        ...data,
        User: {
          ...data.User,
          imgUrl: data.User?.img
            ? `${baseUrl}${imgRelativa}`
            : `${baseUrl}/img/usuarios/default.jpg`
        }
      };
    });

    //respuesta exitosa con la lista de comentarios
    res.status(200).json({ comentarios: comentariosConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener comentarios del libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}