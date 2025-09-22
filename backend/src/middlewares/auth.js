import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
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
    const status = error.name === 'TokenExpiredError' ? 401 : 403;
    return res.status(status).json({ mensaje });
  }
}