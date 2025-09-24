// src/controllers/user/editProfile.controller.js

//Este controlador permite a un usuario autenticado editar su perfil personal.
//La lógica incluye varias validaciones:
// - Verificar que se haya proporcionado la contraseña actual para confirmar los cambios.
// - Confirmar que el usuario exista en la base de datos.
// - Validar que la contraseña ingresada sea correcta.
//
//Si se proporciona una imagen, se procesa de dos formas:
// - Si se sube como archivo (`req.file`), se guarda en la ruta correspondiente.
// - Si se envía como string, se valida que la ruta sea relativa y esté dentro del directorio permitido.
//
//Los campos editables son: nombres, apellidos, celular e imagen.
//Finalmente, se guarda el perfil actualizado y se devuelve una respuesta enriquecida con la URL completa de la imagen.

import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';
import { config } from '../../config/env.js';

export async function editProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const { nombres, apellidos, celular, img, password } = req.body;

    //validación: la contraseña es obligatoria para confirmar los cambios
    if (!password) {
      return res.status(400).json({ mensaje: 'Debes ingresar tu contraseña para confirmar los cambios.' });
    }

    //se busca el usuario por su ID
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    //validación: la contraseña ingresada debe ser correcta
    const esValida = await bcrypt.compare(password, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    //procesamiento de imagen (archivo o string)
    let rutaImg = usuario.img;

    if (req.file) {
      rutaImg = `/img/usuarios/${req.file.filename}`;
    } else if (typeof img === 'string' && img.trim() !== '') {
      rutaImg = img.startsWith('http')
        ? img.replace(/^https?:\/\/[^/]+/, '')
        : img;

      if (!rutaImg.startsWith('/img/usuarios/')) {
        return res.status(400).json({ mensaje: 'La ruta de imagen no es válida.' });
      }
    }

    //actualizar campos editables
    usuario.nombres = nombres?.trim() || usuario.nombres;
    usuario.apellidos = apellidos?.trim() || usuario.apellidos;
    usuario.celular = celular?.trim() || usuario.celular;
    usuario.img = rutaImg;

    //guardar cambios en la base de datos
    await usuario.save();

    //construir perfil enriquecido con URL completa de imagen
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;
    const perfil = {
      id: usuario.id,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      celular: usuario.celular,
      rol: usuario.rol,
      estado: usuario.estado,
      img: usuario.img,
      imgUrl: usuario.img
        ? `${baseUrl}${usuario.img}`
        : `${baseUrl}/img/usuarios/default.jpg`,
      createdAt: usuario.createdAt,
      is_verified: usuario.is_verified
    };

    //respuesta exitosa con el perfil actualizado
    res.status(200).json({ mensaje: 'Perfil actualizado correctamente.', perfil });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al editar perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}