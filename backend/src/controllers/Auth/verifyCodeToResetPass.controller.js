// src/controllers/auth/verifyCodeToResetPass.controller.js

import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

export async function verifyCodeToResetPassController(req, res) {
  const { correo, codigo } = req.body;

  if (!correo || !codigo) {
    return res.status(400).json({ mensaje: 'Correo y código son obligatorios.' });
  }

  const usuario = await User.findOne({ where: { correo } });

  if (!usuario || !usuario.reset_code) {
    return res.status(404).json({ mensaje: 'No se encontró una solicitud de recuperación activa.' });
  }

  if (usuario.reset_code_expire < new Date()) {
    return res.status(410).json({ mensaje: 'El código ha expirado. Solicita uno nuevo.' });
  }

  const esValido = await bcrypt.compare(codigo, usuario.reset_code);

  if (!esValido) {
    return res.status(401).json({ mensaje: 'Código incorrecto.' });
  }

  usuario.reset_code = null;
  usuario.reset_code_expire = null;
  await usuario.save();

  return res.status(200).json({ mensaje: 'Código verificado. Puedes cambiar tu contraseña ahora.' });
}