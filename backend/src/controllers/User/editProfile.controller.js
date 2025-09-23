import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';
import { config } from '../../config/env.js';

export async function editProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const { nombres, apellidos, celular, img, password } = req.body;

    if (!password) {
      return res.status(400).json({ mensaje: 'Debes ingresar tu contraseña para confirmar los cambios.' });
    }

    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esValida = await bcrypt.compare(password, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    let rutaImg = usuario.img;

    // Si viene archivo, usarlo
    if (req.file) {
      rutaImg = `/img/usuarios/${req.file.filename}`;
    }
    // Si viene como string, procesar como antes
    else if (typeof img === 'string' && img.trim() !== '') {
      rutaImg = img.startsWith('http')
        ? img.replace(/^https?:\/\/[^/]+/, '')
        : img;

      if (!rutaImg.startsWith('/img/usuarios/')) {
        return res.status(400).json({ mensaje: 'La ruta de imagen no es válida.' });
      }
    }

    usuario.nombres = nombres?.trim() || usuario.nombres;
    usuario.apellidos = apellidos?.trim() || usuario.apellidos;
    usuario.celular = celular?.trim() || usuario.celular;
    usuario.img = rutaImg;

    await usuario.save();

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

    res.status(200).json({ mensaje: 'Perfil actualizado correctamente.', perfil });
  } catch (error) {
    console.error('Error al editar perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}