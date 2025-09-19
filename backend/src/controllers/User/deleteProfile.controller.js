// src/controllers/user/deleteProfile.controller.js

import { User } from '../../models/index.js';
import { USER_STATUS } from '../../config/constants.js';

export async function deleteProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const { contraseña } = req.body;

    if (!contraseña) {
      return res.status(400).json({ mensaje: 'Debes proporcionar tu contraseña para eliminar la cuenta.' });
    }

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esValida = await usuario.validarContraseña(contraseña);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta. No se puede eliminar la cuenta.' });
    }

    usuario.estado = USER_STATUS.INACTIVO;
    await usuario.save();

    res.status(200).json({ mensaje: 'Tu cuenta ha sido desactivada correctamente.' });
  } catch (error) {
    console.error('Error al desactivar cuenta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}