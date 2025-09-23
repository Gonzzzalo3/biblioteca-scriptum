import { Suggestion, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function listOwnSuggestionController(req, res) {
  try {
    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const sugerencias = await Suggestion.findAll({
      where: { id_usuario },
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']]
    });

    const sugerenciasConUrl = sugerencias.map(s => {
      const data = s.toJSON();
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

    res.status(200).json({ sugerencias: sugerenciasConUrl });
  } catch (error) {
    console.error('Error al listar sugerencias propias:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}