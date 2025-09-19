// src/controllers/Auth/refreshToken.controller.js
import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';
import { User } from '../../models/index.js';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt.js';

export async function refreshTokenController(req, res) {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó el refresh token.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    const usuario = await User.findByPk(decoded.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const payload = {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol
    };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload); // opcional: rotación

    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json({ accessToken: newAccessToken });

  } catch (error) {
    const mensaje =
      error.name === 'TokenExpiredError'
        ? 'Refresh token expirado.'
        : 'Refresh token inválido.';
    return res.status(403).json({ mensaje });
  }
}