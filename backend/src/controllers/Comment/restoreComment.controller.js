import { Comment } from '../../models/index.js';

export async function restoreCommentController(req, res) {
  try {
    const { id } = req.params;

    const comentario = await Comment.findByPk(id);
    if (!comentario || comentario.visible) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado o ya visible.' });
    }

    comentario.visible = true;
    await comentario.save();

    res.status(200).json({ mensaje: 'Comentario restaurado correctamente.' });
  } catch (error) {
    console.error('Error al restaurar comentario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}