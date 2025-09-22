import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

export async function editProfileController(req, res) {
  try {
    const { id } = req.usuario;
    const { nombres, apellidos, celular, img, password } = req.body;

    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const esValida = await bcrypt.compare(password, usuario.contraseña);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    usuario.nombres = nombres ?? usuario.nombres;
    usuario.apellidos = apellidos ?? usuario.apellidos;
    usuario.celular = celular ?? usuario.celular;
    usuario.img = img ?? usuario.img;

    await usuario.save();

    res.status(200).json({ mensaje: 'Perfil actualizado correctamente.', perfil: usuario });
  } catch (error) {
    console.error('Error al editar perfil:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}