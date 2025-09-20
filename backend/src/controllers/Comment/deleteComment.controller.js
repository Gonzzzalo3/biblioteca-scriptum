import { Comment } from '../../models/index.js';

export async function deleteCommentController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    const comentario = await Comment.findByPk(id);
    if (!comentario || comentario.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No puedes eliminar este comentario.' });
    }

    await comentario.destroy();
    res.status(200).json({ mensaje: 'Comentario eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}