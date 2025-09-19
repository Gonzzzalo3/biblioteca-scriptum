// src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

/**
 * Middleware para verificar el token JWT.
 * Requiere formato: Authorization: Bearer <token>
 */
export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret);
    req.usuario = decoded;
    next();
  } catch (error) {
    const mensaje =
      error.name === 'TokenExpiredError'
        ? 'Token expirado'
        : 'Token inválido';
    return res.status(403).json({ error: mensaje });
  }
}