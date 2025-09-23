import { User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function viewProfileController(req, res) {
  try {
    const { id } = req.usuario;

    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const usuario = await User.findByPk(id, {
      attributes: [
        'id',
        'nombres',
        'apellidos',
        'correo',
        'celular',
        'rol',
        'estado',
        'img',
        'is_verified',
        'created_at'
      ]
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const data = usuario.toJSON();

    const perfilConUrl = {
      ...data,
      imgUrl: data.img ? `${baseUrl}${data.img}` : `${baseUrl}/img/usuarios/default.jpg`
    };

    res.status(200).json({ perfil: perfilConUrl });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}