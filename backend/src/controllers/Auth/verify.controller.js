// src/controllers/auth/verify.controller.js

//Este controlador maneja la verificación de la cuenta de usuario mediante un código.
//El flujo es: el usuario recibe un código por correo al registrarse o iniciar sesión,
//luego lo envía a esta ruta para confirmar su identidad y activar su cuenta.
//Si el código es válido y no se había verificado antes, la cuenta pasa a estado verificada.

import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

export async function verifyController(req, res) {
  try {
    const { codigo } = req.body;

    //validación: el código es obligatorio
    if (!codigo || codigo.trim() === '') {
      return res.status(400).json({ mensaje: 'Código de verificación requerido.' });
    }

    //el id del usuario se obtiene del token (inyectado por el middleware de autenticación)
    const { id } = req.usuario;

    //se busca al usuario en la base de datos
    const usuario = await User.findByPk(id);

    //si no existe, se devuelve error
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    //si ya está verificado, no se permite repetir el proceso
    if (usuario.is_verified) {
      return res.status(400).json({ mensaje: 'La cuenta ya está verificada.' });
    }

    //se compara el código ingresado con el almacenado (encriptado)
    const esValido = await bcrypt.compare(codigo, usuario.verify_code);

    //si no coincide, se devuelve error
    if (!esValido) {
      return res.status(401).json({ mensaje: 'Código incorrecto.' });
    }

    //si el código es válido, se marca la cuenta como verificada y se limpia el campo
    usuario.is_verified = true;
    usuario.verify_code = null;
    await usuario.save();

    //respuesta exitosa
    return res.status(200).json({ mensaje: 'Cuenta verificada correctamente.' });

  } catch (error) {
    //si ocurre un error inesperado, se registra y se devuelve error 500
    console.error('Error en verificación:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}