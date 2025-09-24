// src/controllers/auth/register.controller.js

//Este controlador maneja el registro de nuevos usuarios.
//Valida los datos de entrada, evita duplicados, genera un código de verificación,
//envía un correo con dicho código y finalmente devuelve tokens de autenticación
//junto con la información básica del usuario recién creado.

import { User } from "../../models/index.js";
import { transporter } from "../../config/mailer.js";
import { config } from "../../config/env.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import crypto from "crypto";

export async function registerController(req, res) {
  try {
    const { nombres, apellidos, correo, celular, contraseña } = req.body;

    //validación de campos obligatorios
    if (!nombres || !apellidos || !correo || !contraseña) {
      return res.status(400).json({ mensaje: "Faltan campos obligatorios." });
    }

    //verificar si el correo ya está registrado
    const usuarioExistente = await User.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: "El correo ya está registrado." });
    }

    //generar un código de verificación de 6 dígitos
    const verifyCode = crypto.randomInt(100000, 999999).toString();

    //crear el nuevo usuario en la base de datos
    const nuevoUsuario = await User.create({
      nombres,
      apellidos,
      correo,
      celular,
      contraseña,
      verify_code: verifyCode,
      is_verified: false, //por defecto no está verificado
    });

    //enviar correo con el código de verificación
    await transporter.sendMail({
      from: `"Scriptum Biblioteca" <${config.mail.user}>`,
      to: nuevoUsuario.correo,
      subject: "Verifica tu cuenta en Scriptum",
      html: `
        <h2>¡Hola, ${nombres}!</h2>
        <p>Gracias por registrarte en Scriptum. Tu código de verificación es:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 10px 0;">${verifyCode}</div>
        <p>Ingresa este código en la plataforma para activar tu cuenta.</p>
      `,
    });

    //payload mínimo para los tokens
    const payload = {
      id: nuevoUsuario.id,
      correo: nuevoUsuario.correo,
      rol: nuevoUsuario.rol,
    };

    //generar tokens de acceso y refresco
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //enviar respuesta con cookie segura y datos del usuario
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, //no accesible desde JS en el navegador
        secure: true,   //solo por HTTPS
        sameSite: "Strict", //previene CSRF
        maxAge: 15 * 24 * 60 * 60 * 1000, //15 días
      })
      .status(201)
      .json({
        mensaje: "Usuario registrado. Revisa tu correo para verificar tu cuenta.",
        usuario: {
          id: nuevoUsuario.id,
          nombres: nuevoUsuario.nombres,
          apellidos: nuevoUsuario.apellidos,
          correo: nuevoUsuario.correo,
          celular: nuevoUsuario.celular,
          rol: nuevoUsuario.rol,
          estado: nuevoUsuario.estado,
          img: nuevoUsuario.img,
          createdAt: nuevoUsuario.createdAt,
          is_verified: nuevoUsuario.is_verified,
        },
        accessToken,
      });
  } catch (error) {
    //si ocurre un error inesperado, se registra y se devuelve error 500
    console.error("Error en registro:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}