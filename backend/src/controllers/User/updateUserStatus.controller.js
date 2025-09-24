// src/controllers/user/updateUserStatus.controller.js

//Este controlador permite a un administrador cambiar el estado de un usuario entre `SUSPENDIDO` y `ACTIVO`.
//La lógica incluye varias validaciones:
// - Verificar que el usuario exista en la base de datos.
// - Impedir modificaciones si el usuario está marcado como `INACTIVO` (cuenta deshabilitada).
// - Validar que la acción enviada sea `"bloquear"` o `"desbloquear"`.
//
//Si la acción es válida:
// - `"bloquear"` cambia el estado del usuario a `SUSPENDIDO`.
// - `"desbloquear"` lo restablece a `ACTIVO`.
//
//Finalmente, se guarda el cambio y se devuelve un mensaje de confirmación junto con el nuevo estado.

import { User } from "../../models/index.js";
import { USER_STATUS } from "../../config/constants.js";

export async function updateUserStatusController(req, res) {
  try {
    const { id } = req.params;
    const { accion } = req.body; // 'bloquear' o 'desbloquear'

    //se busca el usuario por su ID
    const usuario = await User.findByPk(id);

    //validación: el usuario debe existir
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado." });
    }

    //no se permite modificar usuarios inactivos
    if (usuario.estado === USER_STATUS.INACTIVO) {
      return res.status(403).json({ mensaje: "No se puede modificar un usuario inactivo." });
    }

    //aplicar acción solicitada
    if (accion === "bloquear") {
      usuario.estado = USER_STATUS.SUSPENDIDO;
    } else if (accion === "desbloquear") {
      usuario.estado = USER_STATUS.ACTIVO;
    } else {
      return res.status(400).json({ mensaje: 'Acción inválida. Usa "bloquear" o "desbloquear".' });
    }

    //guardar cambios en la base de datos
    await usuario.save();

    //respuesta exitosa con el nuevo estado
    res.status(200).json({
      mensaje: accion === "bloquear"
        ? "Usuario bloqueado exitosamente."
        : "Usuario desbloqueado exitosamente.",
      estado: usuario.estado
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error("Error al actualizar estado del usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}