// src/controllers/user/deleteProfile.controller.js

//Este controlador permite a un usuario autenticado inhabilitar su cuenta de forma voluntaria.
//La lógica incluye varias validaciones:
// - Verificar que el campo `contraseña` haya sido proporcionado.
// - Confirmar que el usuario exista en la base de datos.
// - Validar que la contraseña ingresada sea correcta.
//
//Si todas las validaciones son exitosas, se actualiza el estado del usuario a `INACTIVO`,
//lo que representa una desactivación de la cuenta sin eliminar sus datos.
//Finalmente, se devuelve un mensaje de confirmación.
//En caso de error, se devuelve el código y mensaje correspondiente.

import { User } from '../../models/index.js';
import { USER_STATUS } from '../../config/constants.js';

export async function deleteProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const { contraseña } = req.body;

    //validación: la contraseña es obligatoria para confirmar la acción
    if (!contraseña) {
      return res.status(400).json({ mensaje: 'Debes proporcionar tu contraseña para eliminar la cuenta.' });
    }

    //se busca el usuario por su ID
    const usuario = await User.findByPk(id);

    //validación: el usuario debe existir
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    //validación: la contraseña ingresada debe ser correcta
    const esValida = await usuario.validarContraseña(contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta. No se puede eliminar la cuenta.' });
    }

    //actualizar estado del usuario a "inactivo"
    usuario.estado = USER_STATUS.INACTIVO;
    await usuario.save();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Tu cuenta ha sido desactivada correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al desactivar cuenta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}