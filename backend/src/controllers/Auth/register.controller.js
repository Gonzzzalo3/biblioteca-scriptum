// src/controllers/auth/register.controller.js
import { User } from '../../models/index.js';
import { transporter } from '../../config/mailer.js';
import { config } from '../../config/env.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';
import crypto from 'crypto';

export async function registerController(req, res) {
  try {
    const { nombres, apellidos, correo, celular, contraseña } = req.body;

    if (!nombres || !apellidos || !correo || !contraseña) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    const usuarioExistente = await User.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado.' });
    }

    const verifyCode = crypto.randomInt(100000, 999999).toString();

    const nuevoUsuario = await User.create({
      nombres,
      apellidos,
      correo,
      celular,
      contraseña,
      verify_code: verifyCode,
      is_verified: false
    });

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

    // Generar tokens
    const payload = {
      id: nuevoUsuario.id,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
      })
      .status(201)
      .json({
        mensaje: 'Usuario registrado. Revisa tu correo para verificar tu cuenta.',
        usuario: {
          id: nuevoUsuario.id,
          nombres: nuevoUsuario.nombres,
          correo: nuevoUsuario.correo,
          rol: nuevoUsuario.rol,
          is_verified: nuevoUsuario.is_verified
        },
        accessToken
      });

  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}