// src/controllers/comment/viewOwnComments.controller.js

//Este controlador permite a un usuario autenticado ver todos los comentarios que ha realizado.
//La consulta incluye información básica del libro al que pertenece cada comentario (título, autor, portada).
//Los comentarios se devuelven ordenados por fecha de creación (más recientes primero).
//Además, se construye la URL completa de la portada del libro, devolviendo `null` si no existe.

import { Comment, Book } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function viewOwnCommentsController(req, res) {
  try {
    const id_usuario = req.usuario.id; //extraído del token por el middleware
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan los comentarios del usuario, incluyendo datos del libro asociado
    const comentarios = await Comment.findAll({
      where: { id_usuario },
      include: {
        model: Book,
        attributes: ['titulo', 'autor', 'portada']
      },
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //se transforma cada comentario para incluir la URL completa de la portada del libro
    const comentariosConUrl = comentarios.map(c => {
      const data = c.toJSON();
      const portadaRelativa = data.Book?.portada?.startsWith('/')
        ? data.Book.portada
        : `/${data.Book?.portada || ''}`;

      return {
        ...data,
        Book: data.Book
          ? {
              ...data.Book,
              portadaUrl: data.Book.portada
                ? `${baseUrl}${portadaRelativa}`
                : null
            }
          : null
      };
    });

    //respuesta exitosa con la lista de comentarios del usuario
    res.status(200).json({ comentarios: comentariosConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener tus comentarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}