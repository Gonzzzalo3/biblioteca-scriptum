// src/middlewares/auth.js

//Este middleware se encarga de verificar el token JWT que llega en las peticiones.
//Si el token es válido, se obtiene el usuario correspondiente y se adjunta al request.
//Si no es válido o no existe, se devuelve un error y no se permite continuar.

import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/index.js';

//Función middleware para verificar el token de acceso
export async function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  //si no existe el header o no empieza con "Bearer", se rechaza la petición
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  //se extrae el token del header
  const token = authHeader.split(' ')[1];

  try {
    //se verifica y decodifica el token usando la clave secreta
    const decoded = jwt.verify(token, config.jwt.accessSecret);

    //se busca el usuario en la base de datos a partir del id del token
    const usuario = await User.findByPk(decoded.id);

    //si el usuario no existe, se devuelve error
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    //se adjunta el usuario al request para que esté disponible en las siguientes funciones
    req.usuario = usuario;

    //si todo está bien, se continúa con la siguiente función o controlador
    next();
  } catch (error) {
    //si el token expiró o es inválido, se devuelve el mensaje correspondiente
    const mensaje =
      error.name === 'TokenExpiredError'
        ? 'Token expirado'
        : 'Token inválido';
    const status = error.name === 'TokenExpiredError' ? 401 : 403;
    return res.status(status).json({ mensaje });
  }
}