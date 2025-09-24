// src/config/mailer.js

import nodemailer from 'nodemailer';
import { config } from './env.js';

//Se crea una constante del Mail que transportará los correos con códigos de verificación
export const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.secure,
  auth: {
    user: config.mail.user, //usuario
    pass: config.mail.pass //contraseña de aplicación
  }
});