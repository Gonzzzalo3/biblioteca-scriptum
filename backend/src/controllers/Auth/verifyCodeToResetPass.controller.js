// src/controllers/auth/verifyCodeToResetPass.controller.js

//Este controlador maneja la segunda etapa del flujo de recuperación de contraseña.
//Su función es validar el código de verificación que el usuario recibió por correo.
//Si el código es correcto y no ha expirado, se confirma la validez de la solicitud
//y se permite al usuario establecer una nueva contraseña.

import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

export async function verifyCodeToResetPassController(req, res) {
  const { correo, codigo } = req.body;

  //validación: correo y código son obligatorios
  if (!correo || !codigo) {
    return res.status(400).json({ mensaje: 'Correo y código son obligatorios.' });
  }

  //se busca al usuario por correo
  const usuario = await User.findOne({ where: { correo } });

  //si no existe o no tiene un código activo, se devuelve error
  if (!usuario || !usuario.reset_code) {
    return res.status(404).json({ mensaje: 'No se encontró una solicitud de recuperación activa.' });
  }

  //si el código ya expiró, se devuelve error
  if (usuario.reset_code_expire < new Date()) {
    return res.status(410).json({ mensaje: 'El código ha expirado. Solicita uno nuevo.' });
  }

  //se compara el código ingresado con el almacenado (encriptado)
  const esValido = await bcrypt.compare(codigo, usuario.reset_code);

  //si no coincide, se devuelve error
  if (!esValido) {
    return res.status(401).json({ mensaje: 'Código incorrecto.' });
  }

  //si el código es válido, se eliminan los datos temporales de recuperación
  usuario.reset_code = null;
  usuario.reset_code_expire = null;
  await usuario.save();

  //respuesta exitosa: el usuario puede continuar con el cambio de contraseña
  return res.status(200).json({ mensaje: 'Código verificado. Puedes cambiar tu contraseña ahora.' });
}