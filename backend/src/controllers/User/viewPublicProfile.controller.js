// src/controllers/user/viewPublicProfile.controller.js

import { User } from '../../models/index.js';

export async function viewPublicProfileController(req, res) {
  try {
    const { id } = req.params;

    const usuario = await User.findByPk(id, {
      attributes: ['id', 'nombres', 'apellidos', 'img', 'rol']
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado.' });
    }

    res.status(200).json({ perfil: usuario });
  } catch (error) {
    console.error('Error al ver perfil público:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}