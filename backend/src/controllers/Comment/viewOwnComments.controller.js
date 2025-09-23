import { Comment, Book } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function viewOwnCommentsController(req, res) {
  try {
    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const comentarios = await Comment.findAll({
      where: { id_usuario },
      include: {
        model: Book,
        attributes: ['titulo', 'autor', 'portada']
      },
      order: [['createdAt', 'DESC']]
    });

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

    res.status(200).json({ comentarios: comentariosConUrl });
  } catch (error) {
    console.error('Error al obtener tus comentarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}