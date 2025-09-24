// src/controllers/auth/loginController.js

//Este controlador maneja el inicio de sesión de los usuarios.
//Valida credenciales, revisa el estado de la cuenta y, si todo es correcto,
//genera los tokens de acceso y refresco. Además, construye la URL de la imagen
//de perfil para devolverla al frontend junto con los datos del usuario.

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { User } from "../../models/User.js";
import { USER_STATUS } from "../../config/constants.js";
import { config } from "../../config/env.js";
import bcrypt from "bcrypt";

export async function loginController(req, res) {
  const { correo, contraseña } = req.body;

  try {
    //se busca al usuario por correo
    const usuario = await User.findOne({ where: { correo } });

    //si no existe, se devuelven credenciales inválidas
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    //si el usuario está suspendido, se bloquea el acceso
    if (usuario.estado === USER_STATUS.SUSPENDIDO) {
      return res.status(403).json({
        mensaje: "Tu cuenta está suspendida. Contacta con soporte para más información."
      });
    }

    //si el usuario está inactivo, se bloquea el acceso
    if (usuario.estado === USER_STATUS.INACTIVO) {
      return res.status(403).json({
        mensaje: "Esta cuenta ha sido desactivada permanentemente. No puedes iniciar sesión."
      });
    }

    //se compara la contraseña ingresada con la almacenada (encriptada)
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    //payload con la información mínima del usuario para los tokens
    const payload = {
      id: usuario.id,
      rol: usuario.rol,
      correo: usuario.correo,
      estado: usuario.estado
    };

    //se generan los tokens de acceso y refresco
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //se construye la URL base y la URL de la imagen de perfil
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;
    const imgUrl = usuario.img
      ? `${baseUrl}${usuario.img}`
      : `${baseUrl}/img/usuarios/default.jpg`;

    //se envía el refreshToken en una cookie segura y el accessToken en la respuesta
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true, //no accesible desde JS en el navegador
        secure: true,   //solo se envía por HTTPS
        sameSite: "Strict", //previene CSRF
        maxAge: 15 * 24 * 60 * 60 * 1000 //15 días
      })
      .status(200)
      .json({
        usuario: {
          id: usuario.id,
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          correo: usuario.correo,
          celular: usuario.celular,
          rol: usuario.rol,
          estado: usuario.estado,
          img: usuario.img,
          imgUrl, //URL completa de la imagen de perfil
          createdAt: usuario.createdAt,
          is_verified: usuario.is_verified
        },
        accessToken
      });
  } catch (error) {
    //si ocurre un error inesperado, se registra y se devuelve error 500
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}