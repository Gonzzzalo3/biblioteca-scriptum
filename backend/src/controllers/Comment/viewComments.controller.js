import { Comment, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function viewCommentsController(req, res) {
  try {
    const { id_libro } = req.params;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const comentarios = await Comment.findAll({
      where: { id_libro, visible: true },
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']]
    });

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

    res.status(200).json({ comentarios: comentariosConUrl });
  } catch (error) {
    console.error('Error al obtener comentarios del libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}