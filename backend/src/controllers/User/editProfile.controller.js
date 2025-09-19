// src/controllers/user/editProfile.controller.js

import { User } from '../../models/index.js';

export async function editProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const { nombres, apellidos, celular, img } = req.body;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    usuario.nombres = nombres ?? usuario.nombres;
    usuario.apellidos = apellidos ?? usuario.apellidos;
    usuario.celular = celular ?? usuario.celular;
    usuario.img = img ?? usuario.img;

    await usuario.save();

    res.status(200).json({ mensaje: 'Perfil actualizado correctamente.', perfil: usuario });
  } catch (error) {
    console.error('Error al editar perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}