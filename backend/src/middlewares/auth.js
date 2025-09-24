import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/index.js';

export async function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret);


    const usuario = await User.findByPk(decoded.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    req.usuario = usuario; 
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