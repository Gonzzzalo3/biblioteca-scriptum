// src/controllers/auth/resetPassword.controller.js

import { User } from '../../models/index.js';

export async function resetPasswordController(req, res) {
  const { correo, nuevaContraseña, repetirContraseña } = req.body;

  if (!correo || !nuevaContraseña || !repetirContraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
  }

  if (nuevaContraseña !== repetirContraseña) {
    return res.status(400).json({ mensaje: 'Las contraseñas no coinciden.' });
  }

  const usuario = await User.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
  }

  usuario.contraseña = nuevaContraseña;
  await usuario.save();

  return res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
}