// src/controllers/user/viewProfile.controller.js

import { User } from '../../models/index.js';

export async function viewProfileController(req, res) {
  try {
    const { id } = req.usuario;

    const usuario = await User.findByPk(id, {
      attributes: ['id', 'nombres', 'apellidos', 'correo', 'celular', 'rol', 'estado', 'img', 'is_verified']
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    res.status(200).json({ perfil: usuario });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}