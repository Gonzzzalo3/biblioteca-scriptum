// src/middlewares/validateVerificationStatus.js

//Este middleware se encarga de validar si la cuenta del usuario autenticado
//ya fue verificada por correo electrónico. 
//Su objetivo es impedir que un usuario no verificado pueda acceder a rutas protegidas,
//obligándolo a completar el proceso de verificación antes de usar el sistema.

import { User } from "../models/User.js";

export async function validateVerificationStatus(req, res, next) {
  //si no hay usuario en la request (ej. rutas públicas), se deja pasar
  if (!req.usuario) return next();

  const { id } = req.usuario;

  try {
    //se busca el usuario en la base de datos
    const usuario = await User.findByPk(id);

    //si no existe, se devuelve error
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    //si el usuario no está verificado, se bloquea el acceso
    if (!usuario.is_verified) {
      return res.status(403).json({
        mensaje: "Tu cuenta aún no está verificada. Revisa tu correo.",
        requiereVerificacion: true //flag para que el frontend sepa que falta verificación
      });
    }

    //si todo está correcto, se permite continuar
    next();
  } catch (error) {
    //si ocurre un error inesperado, se registra en consola y se devuelve error 500
    console.error("Error al validar verificación:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}