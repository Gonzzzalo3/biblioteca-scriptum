// src/controllers/book/deleteBook.controller.js

import { Book } from '../../models/index.js';

export async function deleteBookController(req, res) {
  try {
    const { id } = req.params;

    const libro = await Book.findByPk(id);

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    await libro.destroy();

    res.status(200).json({ mensaje: 'Libro eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}