import { Suggestion, User } from '../../models/index.js';

export async function listAllSuggestionController(req, res) {
  try {
    const sugerencias = await Suggestion.findAll({
      include: {
        model: User,
        attributes: ['id', 'nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']]
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const sugerenciasConUrl = sugerencias.map((s) => {
      const data = s.toJSON();
      return {
        ...data,
        User: {
          ...data.User,
          imgUrl: data.User?.img
            ? `${baseUrl}${data.User.img}`
            : `${baseUrl}/img/usuarios/default.jpg`
        }
      };
    });

    res.status(200).json({ sugerencias: sugerenciasConUrl });
  } catch (error) {
    console.error('Error al listar todas las sugerencias:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}