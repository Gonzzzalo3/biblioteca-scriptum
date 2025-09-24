// src/controllers/auth/forgotPassword.controller.js

//Este controlador maneja la primera etapa del flujo de recuperación de contraseña.
//Su función es recibir el correo del usuario, verificar que exista en la base de datos,
//generar un código temporal de verificación y enviarlo por correo electrónico.
//El código tiene una validez limitada (15 minutos) y servirá para validar la solicitud
//antes de permitir el cambio de contraseña.

import { User } from '../../models/index.js'; 
import { transporter } from '../../config/mailer.js';
import { config } from '../../config/env.js';
import crypto from 'crypto';

export async function forgotPasswordController(req, res) {
  const { correo } = req.body;

  //validación: el correo es obligatorio
  if (!correo || correo.trim() === '') {
    return res.status(400).json({ mensaje: 'Debes ingresar tu correo electrónico.' });
  }

  //se busca al usuario por correo
  const usuario = await User.findOne({ where: { correo } });

  //si no existe, se devuelve error
  if (!usuario) {
    return res.status(404).json({ mensaje: 'No existe una cuenta con ese correo.' });
  }

  //se genera un código de 6 dígitos y una fecha de expiración (15 minutos)
  const resetCode = crypto.randomInt(100000, 999999).toString();
  const expireDate = new Date(Date.now() + 15 * 60 * 1000);

  //se guardan el código y la fecha de expiración en el usuario
  usuario.reset_code = resetCode;
  usuario.reset_code_expire = expireDate;
  await usuario.save();

  //se envía el correo con el código de recuperación
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

  //respuesta al cliente
  return res.status(200).json({ mensaje: 'Código enviado al correo registrado.' });
}