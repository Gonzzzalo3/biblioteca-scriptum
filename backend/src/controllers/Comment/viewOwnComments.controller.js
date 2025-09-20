import { Comment, Book } from '../../models/index.js';

export async function viewOwnCommentsController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    const comentarios = await Comment.findAll({
      where: { id_usuario },
      include: {
        model: Book,
        attributes: ['titulo', 'autor', 'portada']
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ comentarios });
  } catch (error) {
    console.error('Error al obtener tus comentarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}