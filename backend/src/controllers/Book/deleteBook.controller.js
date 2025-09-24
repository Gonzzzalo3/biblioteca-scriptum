// src/controllers/book/deleteBook.controller.js

//Este controlador permite al bibliotecario eliminar un libro del sistema.
//Primero valida que el libro exista en la base de datos y, si es así,
//lo elimina de forma permanente. Si no existe, devuelve un error 404.

import { Book } from '../../models/index.js';

export async function deleteBookController(req, res) {
  try {
    const { id } = req.params;

    //se busca el libro por su ID
    const libro = await Book.findByPk(id);

    //si no existe, se devuelve error
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    //se elimina el libro de la base de datos
    await libro.destroy();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Libro eliminado correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al eliminar libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}