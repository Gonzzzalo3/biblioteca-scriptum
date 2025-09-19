// src/controllers/auth/forgotPassword.controller.js

import { User } from '../../models/index.js';
import { transporter } from '../../config/mailer.js';
import { config } from '../../config/env.js';
import crypto from 'crypto';

export async function forgotPasswordController(req, res) {
  const { correo } = req.body;

  if (!correo || correo.trim() === '') {
    return res.status(400).json({ mensaje: 'Debes ingresar tu correo electrónico.' });
  }

  const usuario = await User.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(404).json({ mensaje: 'No existe una cuenta con ese correo.' });
  }

  const resetCode = crypto.randomInt(100000, 999999).toString();
  const expireDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  usuario.reset_code = resetCode;
  usuario.reset_code_expire = expireDate;
  await usuario.save();

  await transporter.sendMail({
    from: `"Scriptum Biblioteca" <${config.mail.user}>`,
    to: usuario.correo,
    subject: 'Recupera tu contraseña en Scriptum',
    html: `
      <h2>Hola, ${usuario.nombres}</h2>
      <p>Tu código para recuperar la contraseña es:</p>
      <div style="font-size: 24px; font-weight: bold;">${resetCode}</div>
      <p>Este código expirará en 15 minutos.</p>
    `
  });

  return res.status(200).json({ mensaje: 'Código enviado al correo registrado.' });
}