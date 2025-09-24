// src/controllers/auth/resetPassword.controller.js

//Este controlador maneja la etapa final del flujo de recuperación de contraseña.
//Su función es permitir al usuario establecer una nueva contraseña, 
//una vez que ya se haya validado el código de verificación en el paso anterior.
//Incluye validaciones básicas de campos y asegura que las contraseñas coincidan.

import { User } from '../../models/index.js';

export async function resetPasswordController(req, res) {
  const { correo, nuevaContraseña, repetirContraseña } = req.body;

  //validación: todos los campos son obligatorios
  if (!correo || !nuevaContraseña || !repetirContraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
  }

  //validación: las contraseñas deben coincidir
  if (nuevaContraseña !== repetirContraseña) {
    return res.status(400).json({ mensaje: 'Las contraseñas no coinciden.' });
  }

  //se busca al usuario por correo
  const usuario = await User.findOne({ where: { correo } });

  //si no existe, se devuelve error
  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
  }

  //se actualiza la contraseña del usuario
  usuario.contraseña = nuevaContraseña;
  await usuario.save();

  //respuesta exitosa
  return res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
}