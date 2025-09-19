// src/controllers/book/createBook.controller.js

import { Book } from '../../models/index.js';

export async function createBookController(req, res) {
  try {
    const { titulo, autor, sinopsis, portada, isbn, stock, id_categoria } = req.body;

    if (!titulo || !autor || !isbn || !id_categoria) {
      return res.status(400).json({ mensaje: 'Campos obligatorios faltantes.' });
    }

    const nuevoLibro = await Book.create({
      titulo,
      autor,
      sinopsis,
      portada,
      isbn,
      stock,
      id_categoria
    });

    res.status(201).json({ mensaje: 'Libro creado correctamente.', libro: nuevoLibro });
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}