// src/controllers/user/getAllUsersWithStatus.controller.js

//Este controlador permite obtener una lista de todos los usuarios con rol `cliente`,
//enriquecida con información adicional sobre su actividad en el sistema.
//
//Por cada usuario se calcula:
// - Si tiene reservas activas (en estado `reservado` o `prestado`).
// - Cuántas reservas vencidas tiene (fecha_fin anterior a hoy).
// - Su nombre completo y la imagen de perfil normalizada como URL completa.
//
//Este controlador es útil para paneles administrativos, métricas de comportamiento,
//alertas de vencimientos o visualización de actividad general de los usuarios.
//
//La respuesta incluye una lista ordenada alfabéticamente por nombre,
//con datos listos para renderizar en el frontend.

import { User, Reservation } from "../../models/index.js";
import { config } from "../../config/env.js";

export async function getAllUsersWithStatusController(req, res) {
  try {
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get("host")}`;

    //obtener todos los usuarios con rol "cliente"
    const usuarios = await User.findAll({
      attributes: ["id", "nombres", "apellidos", "img"],
      where: { rol: "cliente" },
      order: [["nombres", "ASC"]]
    });

    const hoy = new Date();

    //procesar cada usuario para calcular estado de reservas
    const resultados = await Promise.all(
      usuarios.map(async (usuario) => {
        //obtener todas las reservas del usuario
        const reservas = await Reservation.findAll({
          where: { id_usuario: usuario.id }
        });

        //contar reservas vencidas (fecha_fin anterior a hoy)
        const vencimientos = reservas.filter(
          (r) => r.fecha_fin && new Date(r.fecha_fin) < hoy
        ).length;

        //verificar si tiene reservas activas
        const tieneReservas = reservas.some((r) =>
          ["reservado", "prestado"].includes(r.estado)
        );

        //normalizar imagen de perfil
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
          tieneReservas
        };
      })
    );

    //respuesta exitosa con la lista enriquecida de usuarios
    res.status(200).json({ usuarios: resultados });
  } catch (error) {
    //manejo de errores inesperados
    console.error("Error al obtener estado de usuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}