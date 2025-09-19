// src/controllers/user/updateUserStatus.controller.js

import { User } from '../../models/index.js';
import { USER_STATUS } from '../../config/constants.js';

export async function updateUserStatusController(req, res) {
  try {
    const { id } = req.params;
    const { accion } = req.body; // 'bloquear' o 'desbloquear'

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    if (usuario.estado === USER_STATUS.INACTIVO) {
      return res.status(403).json({ mensaje: 'No se puede modificar un usuario inactivo.' });
    }

    if (accion === 'bloquear') {
      usuario.estado = USER_STATUS.SUSPENDIDO;
    } else if (accion === 'desbloquear') {
      usuario.estado = USER_STATUS.ACTIVO;
    } else {
      return res.status(400).json({ mensaje: 'Acción inválida. Usa "bloquear" o "desbloquear".' });
    }

    await usuario.save();

    res.status(200).json({
      mensaje: `Usuario ${accion} correctamente.`,
      estado: usuario.estado
    });
  } catch (error) {
    console.error('Error al actualizar estado del usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}