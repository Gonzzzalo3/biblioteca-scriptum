// src/controllers/auth/registerController.js
import { User } from '../../models/index.js';
import { transporter } from '../../config/mailer.js';
import { config } from '../../config/env.js';
import crypto from 'crypto';

export async function registerController(req, res) {
  try {
    const { nombres, apellidos, correo, celular, contraseña } = req.body;

    // Validación básica
    if (!nombres || !apellidos || !correo || !contraseña) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    // Verificar si el correo ya está registrado
    const usuarioExistente = await User.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado.' });
    }

    // Generar código de verificación de 6 dígitos
    const verifyCode = crypto.randomInt(100000, 999999).toString();

    // Crear el usuario (el modelo hashea contraseña y verify_code automáticamente)
    const nuevoUsuario = await User.create({
      nombres,
      apellidos,
      correo,
      celular,
      contraseña,
      verify_code: verifyCode,
      is_verified: false
    });

    // Enviar correo con el código de verificación
    await transporter.sendMail({
      from: `"Scriptum Biblioteca" <${config.mail.user}>`,
      to: nuevoUsuario.correo,
      subject: 'Verifica tu cuenta en Scriptum',
      html: `
        <h2>¡Hola, ${nombres}!</h2>
        <p>Gracias por registrarte en Scriptum. Tu código de verificación es:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 10px 0;">${verifyCode}</div>
        <p>Ingresa este código en la plataforma para activar tu cuenta.</p>
      `
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente. Revisa tu correo para verificar tu cuenta.'
    });

  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}