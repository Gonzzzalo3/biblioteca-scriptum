// src/controllers/auth/refreshToken.controller.js

//Este controlador maneja la renovación de tokens de acceso.
//Su función es validar el refresh token recibido en la cookie,
//verificar que el usuario exista y, si todo es correcto,
//emitir un nuevo accessToken y un nuevo refreshToken (rotación opcional).

import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';
import { User } from '../../models/index.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';
import ms from 'ms'; //utilidad para manejar tiempos de expiración en formato legible

export async function refreshTokenController(req, res) {
  const token = req.cookies.refreshToken;

  //si no se envía el refresh token, se rechaza la petición
  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó el refresh token.' });
  }

  try {
    //se verifica y decodifica el refresh token
    const decoded = jwt.verify(token, config.jwt.refreshSecret);

    //se busca al usuario asociado al token
    const usuario = await User.findByPk(decoded.id);

    //si el usuario no existe, se devuelve error
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    //payload mínimo para generar nuevos tokens
    const payload = {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol
    };

    //se generan nuevos tokens (rotación de refresh token opcional)
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    //se envía el nuevo refresh token en una cookie segura y el access token en la respuesta
    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true, //no accesible desde JS en el navegador
        secure: true,   //solo por HTTPS
        sameSite: 'Strict', //previene CSRF
        maxAge: ms(config.jwt.refreshExpiresIn) //tiempo de expiración configurado
      })
      .status(200)
      .json({ accessToken: newAccessToken });

  } catch (error) {
    //si el token expiró o es inválido, se devuelve el mensaje correspondiente
    const mensaje =
      error.name === 'TokenExpiredError'
        ? 'Refresh token expirado.'
        : 'Refresh token inválido.';
    return res.status(403).json({ mensaje });
  }
}