// src/middlewares/validateVerificationStatus.js
import { User } from "../models/User.js";

export async function validateVerificationStatus(req, res, next) {
  const { id } = req.usuario;

  try {
    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    if (!usuario.is_verified) {
      return res.status(403).json({
        mensaje: "Tu cuenta aún no está verificada. Revisa tu correo.",
        requiereVerificacion: true
      });
    }

    next();
  } catch (error) {
    console.error("Error al validar verificación:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}