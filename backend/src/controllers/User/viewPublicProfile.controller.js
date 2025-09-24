// src/controllers/user/viewPublicProfile.controller.js

//Este controlador permite consultar el perfil público de cualquier usuario por su ID.
//La consulta incluye únicamente los campos visibles públicamente:
// - Identificador, nombres, apellidos.
// - Imagen de perfil, rol, estado y fecha de creación.
//
//No se exponen datos sensibles como correo, celular o verificación.
//Si el usuario no existe, se devuelve un error 404.
//Si se encuentra, se devuelve el perfil público como respuesta.

import { User } from "../../models/index.js";

export async function viewPublicProfileController(req, res) {
  try {
    const { id } = req.params;

    //se busca el usuario por su ID, seleccionando solo atributos públicos
    const usuario = await User.findByPk(id, {
      attributes: [
        "id",
        "nombres",
        "apellidos",
        "img",
        "rol",
        "estado",
        "created_at"
      ]
    });

    //validación: si no existe el usuario, se devuelve error 404
    if (!usuario) {
      return res.status(404).json({ mensaje: "Perfil no encontrado." });
    }

    //respuesta exitosa con el perfil público
    res.status(200).json({ perfil: usuario });
  } catch (error) {
    //manejo de errores inesperados
    console.error("Error al ver perfil público:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}