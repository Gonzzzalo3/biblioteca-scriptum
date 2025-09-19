// src/controllers/user/listUsers.controller.js

import { User } from '../../models/index.js';
import { ROLES } from '../../config/constants.js';

export async function listUsersController(req, res) {
  try {
    const clientes = await User.findAll({
      where: { rol: ROLES.CLIENTE },
      attributes: ['id', 'nombres', 'apellidos', 'correo', 'estado', 'img']
    });

    res.status(200).json({ usuarios: clientes });
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}