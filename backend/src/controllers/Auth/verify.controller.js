// src/controllers/auth/verifyController.js
import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

export async function verifyController(req, res) {
  try {
    const { correo, codigo } = req.body;

    if (!correo || !codigo) {
      return res.status(400).json({ mensaje: 'Correo y código son obligatorios.' });
    }

    const usuario = await User.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    if (usuario.is_verified) {
      return res.status(200).json({ mensaje: 'La cuenta ya está verificada.' });
    }

    const esValido = await bcrypt.compare(codigo, usuario.verify_code);

    if (!esValido) {
      return res.status(401).json({ mensaje: 'Código incorrecto.' });
    }

    usuario.is_verified = true;
    usuario.verify_code = null;
    await usuario.save();

    return res.status(200).json({ mensaje: 'Cuenta verificada correctamente.' });

  } catch (error) {
    console.error('Error en verificación:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}