// src/controllers/user/listUsers.controller.js

//Este controlador permite listar todos los usuarios con rol `CLIENTE` registrados en el sistema.
//La consulta incluye:
// - Identificador, nombres, apellidos, correo electrónico.
// - Estado de la cuenta e imagen de perfil.
//
//Está pensado para uso administrativo, por ejemplo, para que el bibliotecario
//pueda visualizar el conjunto de usuarios activos o inactivos.
//
//No se incluyen datos sensibles ni contraseñas.
//Finalmente, se devuelve la lista de usuarios como respuesta.

import { User } from '../../models/index.js';
import { ROLES } from '../../config/constants.js';

export async function listUsersController(req, res) {
  try {
    //se buscan todos los usuarios con rol "cliente"
    const clientes = await User.findAll({
      where: { rol: ROLES.CLIENTE },
      attributes: ['id', 'nombres', 'apellidos', 'correo', 'estado', 'img']
    });

    //respuesta exitosa con la lista de usuarios
    res.status(200).json({ usuarios: clientes });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}