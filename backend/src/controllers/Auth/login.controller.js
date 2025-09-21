// src/controllers/auth/login.controller.js

import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { User } from "../../models/User.js";
import bcrypt from "bcrypt";

export async function loginController(req, res) {
  const { correo, contraseña } = req.body;

  const usuario = await User.findOne({ where: { correo } });

  if (!usuario) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

  if (!contraseñaValida) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const payload = {
    id: usuario.id,
    rol: usuario.rol,
    correo: usuario.correo,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
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
        createdAt: usuario.createdAt, 
      },
      accessToken,
    });
}
