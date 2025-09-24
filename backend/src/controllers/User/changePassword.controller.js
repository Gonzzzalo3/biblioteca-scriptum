// src/controllers/user/changePassword.controller.js

//Este controlador permite a un usuario autenticado cambiar su contraseña.
//La lógica incluye varias validaciones:
// - Verificar que todos los campos requeridos estén presentes (`actual`, `nueva`, `repetir`).
// - Confirmar que la nueva contraseña coincida con la repetición.
// - Verificar que el usuario exista en la base de datos.
// - Validar que la contraseña actual ingresada sea correcta.
//
//Si todas las validaciones son exitosas, se actualiza la contraseña del usuario
//y se guarda el cambio en la base de datos.
//Finalmente, se devuelve un mensaje de confirmación.
//En caso de error, se devuelve el código y mensaje correspondiente.

import { User } from '../../models/index.js';

export async function changePasswordController(req, res) {
  try {
    const { id } = req.usuario;
    const { actual, nueva, repetir } = req.body;

    //validación: todos los campos son obligatorios
    if (!actual || !nueva || !repetir) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    //validación: la nueva contraseña debe coincidir con la repetición
    if (nueva !== repetir) {
      return res.status(400).json({ mensaje: 'Las contraseñas no coinciden.' });
    }

    //se busca el usuario por su ID
    const usuario = await User.findByPk(id);

    //validación: el usuario debe existir
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    //validación: la contraseña actual debe ser correcta
    const esValida = await usuario.validarContraseña(actual);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña actual incorrecta.' });
    }

    //actualizar la contraseña del usuario
    usuario.contraseña = nueva;
    await usuario.save();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}