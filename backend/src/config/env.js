// src/config/env.js

//En este archivo centraliza las variables de entorno en un objeto llamado config, para poder usarlos más comodamente
import dotenv from 'dotenv'; //importando el módulo dotenv para trabajar con variables de entorno
dotenv.config(); //punto de entrada para las variables de entorno

//función para validar si los datos existen en el archivo ".env", si existe lo retornará y lo igualará a la variable correspondiente del objeto, si no existe saltará un error
function validateEnvVariable(name, value) {
  if (!value || value.trim() === '') {
    throw new Error(`La variable de entorno "${name}" está vacía o no definida.`);
  }
  return value;
}

//objeto config que guardará los valores de las variables de entorno
export const config = {
  server: {
    port: process.env.PORT || 3000, //puerto 3000 por defecto
    env: process.env.NODE_ENV || 'development', //entorno de desarrollo "development" por defecto
  },
  db: {
    name: validateEnvVariable('DB_NAME', process.env.DB_NAME),
    user: validateEnvVariable('DB_USER', process.env.DB_USER),
    pass: validateEnvVariable('DB_PASS', process.env.DB_PASS),
    host: validateEnvVariable('DB_HOST', process.env.DB_HOST),
    port: validateEnvVariable('DB_PORT', process.env.DB_PORT),
  },
  jwt: {
    accessSecret: validateEnvVariable('ACCESS_TOKEN_SECRET', process.env.ACCESS_TOKEN_SECRET),
    refreshSecret: validateEnvVariable('REFRESH_TOKEN_SECRET', process.env.REFRESH_TOKEN_SECRET),
    accessExpiresIn: validateEnvVariable('ACCESS_TOKEN_EXPIRES_IN', process.env.ACCESS_TOKEN_EXPIRES_IN),
    refreshExpiresIn: validateEnvVariable('REFRESH_TOKEN_EXPIRES_IN', process.env.REFRESH_TOKEN_EXPIRES_IN),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || null,
  },
};