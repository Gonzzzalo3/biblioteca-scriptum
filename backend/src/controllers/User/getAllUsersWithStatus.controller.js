// src/controllers/user/getAllUsersWithStatus.controller.js
import { User, Reservation } from "../../models/index.js";
import { config } from "../../config/env.js";

export async function getAllUsersWithStatusController(req, res) {
  try {
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get("host")}`;

    // Obtener todos los usuarios con rol "cliente"
    const usuarios = await User.findAll({
      attributes: ["id", "nombres", "apellidos", "img"],
      where: { rol: "cliente" },
      order: [["nombres", "ASC"]],
    });

    const hoy = new Date();

    // Procesar cada usuario
    const resultados = await Promise.all(
      usuarios.map(async (usuario) => {
        // Obtener todas sus reservas
        const reservas = await Reservation.findAll({
          where: { id_usuario: usuario.id },
        });

        // Contar vencimientos
        const vencimientos = reservas.filter(
          (r) => r.fecha_fin && new Date(r.fecha_fin) < hoy
        ).length;

        // Verificar si tiene reservas activas
        const tieneReservas = reservas.some((r) =>
          ["reservado", "prestado"].includes(r.estado)
        );

        // Normalizar imagen
        const imgRelativa =
          usuario.img && usuario.img.trim() !== ""
            ? usuario.img
            : "/img/usuarios/default.jpg";

        const imgUrl = imgRelativa.startsWith("/")
          ? `${baseUrl}${imgRelativa}`
          : `${baseUrl}/${imgRelativa}`;

        return {
          id: usuario.id,
          nombres: usuario.nombres || "",
          apellidos: usuario.apellidos || "",
          nombreCompleto: `${usuario.nombres || ""} ${usuario.apellidos || ""}`.trim(),
          img: imgUrl,
          vencimientos,
          tieneReservas,
        };
      })
    );

    res.status(200).json({ usuarios: resultados });
  } catch (error) {
    console.error("Error al obtener estado de usuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}