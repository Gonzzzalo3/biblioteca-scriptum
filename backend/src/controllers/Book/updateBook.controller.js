// src/controllers/book/updateBook.controller.js
import { Book } from '../../models/index.js';

export async function updateBookController(req, res) {
  try {
    const { id } = req.params;
    const { titulo, autor, sinopsis, isbn, stock, id_categoria } = req.body;

    const libro = await Book.findByPk(id);

    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    // Actualizar campos de texto
    libro.titulo = titulo ?? libro.titulo;
    libro.autor = autor ?? libro.autor;
    libro.sinopsis = sinopsis ?? libro.sinopsis;
    libro.isbn = isbn ?? libro.isbn;
    libro.stock = stock ?? libro.stock;
    libro.id_categoria = id_categoria ?? libro.id_categoria;

    // Actualizar portada si se subió un archivo nuevo
    if (req.file) {
      // Multer guarda el archivo en la carpeta que configuraste
      // y expone el nombre en req.file.filename
      libro.portada = `/img/libros/${req.file.filename}`;
    }

    await libro.save();

    res.status(200).json({ mensaje: 'Libro actualizado correctamente.', libro });
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}