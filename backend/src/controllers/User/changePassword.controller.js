// src/controllers/user/changePassword.controller.js

import { User } from '../../models/index.js';

export async function changePasswordController(req, res) {
  try {
    const { id } = req.usuario;
    const { actual, nueva, repetir } = req.body;

    if (!actual || !nueva || !repetir) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    if (nueva !== repetir) {
      return res.status(400).json({ mensaje: 'Las contraseñas no coinciden.' });
    }

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esValida = await usuario.validarContraseña(actual);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta.' });
    }

    usuario.contraseña = nueva;
    await usuario.save();

    res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}