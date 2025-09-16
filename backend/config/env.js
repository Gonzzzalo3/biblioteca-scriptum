// config/env.js

//En esta carpeta centraliza las variables de entorno en un objeto llamado config, para poder usarlos más comodamente
import dotenv from 'dotenv'; //importando el módulo dotenv para trabajar con variables de entorno
dotenv.config(); //punto de entrada para las variables de entorno

//objeto config que guardará los valores de las variables de entorno
export const config = {
  server: {
    port: process.env.PORT || 3000, //puerto 3000 por defecto
    env: process.env.NODE_ENV || 'development', //entorno de desarrollo "development" por defecto
  },
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
  },
  jwt: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
};