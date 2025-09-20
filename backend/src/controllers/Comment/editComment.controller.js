import { Comment } from '../../models/index.js';

export async function editCommentController(req, res) {
  try {
    const { id } = req.params;
    const { contenido, calificacion } = req.body;
    const id_usuario = req.usuario.id;

    const comentario = await Comment.findByPk(id);
    if (!comentario || comentario.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No puedes editar este comentario.' });
    }

    comentario.contenido = contenido;
    comentario.calificacion = calificacion;
    await comentario.save();

    res.status(200).json({ mensaje: 'Comentario actualizado correctamente.', comentario });
  } catch (error) {
    console.error('Error al editar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}