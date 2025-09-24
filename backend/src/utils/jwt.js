// src/utils/jwt.js

//Este archivo se encarga de manejar la generación de tokens JWT.
//Se generan dos tipos de tokens: accessToken (para autenticación rápida)
//y refreshToken (para renovar el accessToken cuando expira).

import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

//Función que genera un token de acceso
//Este token se usa en cada petición para validar al usuario
export function generateAccessToken(payload) {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn, //tiempo de expiración definido en la configuración
  });
}

//Función que genera un token de refresco
//Este token se usa para obtener un nuevo accessToken sin necesidad de loguearse otra vez
export function generateRefreshToken(payload) {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn, //tiempo de expiración más largo que el accessToken
  });
}