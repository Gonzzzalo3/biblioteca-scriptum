// src/controllers/user/viewProfile.controller.js

//Este controlador permite a un usuario autenticado consultar su propio perfil.
//La consulta incluye:
// - Datos personales del usuario (id, nombres, apellidos, correo, celular).
// - Información de cuenta (rol, estado, verificación, fecha de creación).
// - Imagen de perfil (`img`) y su versión enriquecida como URL completa (`imgUrl`).
//
//Si el usuario no existe, se devuelve un error 404.
//Si se encuentra, se construye un objeto enriquecido con la imagen procesada
//y se devuelve como respuesta.

import { User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function viewProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se busca el usuario por su ID, seleccionando atributos relevantes
    const usuario = await User.findByPk(id, {
      attributes: [
        'id',
        'nombres',
        'apellidos',
        'correo',
        'celular',
        'rol',
        'estado',
        'img',
        'is_verified',
        'created_at'
      ]
    });

    //validación: el usuario debe existir
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    //construir perfil enriquecido con URL completa de imagen
    const data = usuario.toJSON();
    const perfilConUrl = {
      ...data,
      imgUrl: data.img
        ? `${baseUrl}${data.img}`
        : `${baseUrl}/img/usuarios/default.jpg`
    };

    //respuesta exitosa con el perfil del usuario
    res.status(200).json({ perfil: perfilConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}