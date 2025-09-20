import { Comment } from '../../models/index.js';

export async function createCommentController(req, res) {
  try {
    const { id_libro, contenido, calificacion } = req.body;
    const id_usuario = req.usuario.id;

    const comentario = await Comment.create({
      id_libro,
      id_usuario,
      contenido,
      calificacion
    });

    res.status(201).json({ mensaje: 'Comentario creado correctamente.', comentario });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}