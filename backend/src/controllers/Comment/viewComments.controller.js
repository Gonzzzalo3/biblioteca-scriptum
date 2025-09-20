import { Comment, User } from '../../models/index.js';

export async function viewCommentsController(req, res) {
  try {
    const { id_libro } = req.params;

    const comentarios = await Comment.findAll({
      where: { id_libro, visible: true },
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ comentarios });
  } catch (error) {
    console.error('Error al obtener comentarios del libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}