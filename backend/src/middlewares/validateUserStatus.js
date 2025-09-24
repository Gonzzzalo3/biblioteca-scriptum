// src/middlewares/validateUserStatus.js

//Este middleware se encarga de validar el estado de la cuenta del usuario autenticado.
//Su función es bloquear acciones si el usuario está suspendido o inactivo.
//De esta manera se asegura que solo usuarios activos puedan interactuar con el sistema.

import { USER_STATUS } from "../config/constants.js";

export function validateUserStatus(req, res, next) {
  const usuario = req.usuario;

  //si no hay usuario en la request (por ejemplo, rutas públicas), se continúa sin validar
  if (!usuario) return next();

  const { estado } = usuario;

  //si el usuario está suspendido, se bloquea la acción
  if (estado === USER_STATUS.SUSPENDIDO) {
    return res.status(403).json({
      mensaje: 'Tu cuenta está suspendida. No puedes realizar esta acción.'
    });
  }

  //si el usuario está inactivo, se bloquea el acceso total al sistema
  if (estado === USER_STATUS.INACTIVO) {
    return res.status(403).json({
      mensaje: 'Tu cuenta ha sido desactivada permanentemente. No puedes acceder al sistema.'
    });
  }

  //si el estado es válido (activo), se permite continuar
  next();
}