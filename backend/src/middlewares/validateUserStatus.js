// src/middlewares/validateUserStatus.js
import { USER_STATUS } from "../config/constants.js";

export function validateUserStatus(req, res, next) {
  const usuario = req.usuario;

  if (!usuario) return next();

  const { estado } = usuario;

  if (estado === USER_STATUS.SUSPENDIDO) {
    return res.status(403).json({
      mensaje: 'Tu cuenta está suspendida. No puedes realizar esta acción.'
    });
  }

  if (estado === USER_STATUS.INACTIVO) {
    return res.status(403).json({
      mensaje: 'Tu cuenta ha sido desactivada permanentemente. No puedes acceder al sistema.'
    });
  }

  next();
}