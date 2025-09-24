// src/controllers/book/updateBook.controller.js

//Este controlador permite al bibliotecario actualizar la información de un libro existente.
//Primero valida que el libro exista en la base de datos. Si existe, actualiza los campos
//que se envíen en la petición (título, autor, sinopsis, ISBN, stock, categoría).
//Además, si se sube una nueva portada, reemplaza la anterior con la nueva ruta generada por Multer.

import { Book } from '../../models/index.js';

export async function updateBookController(req, res) {
  try {
    const { id } = req.params;
    const { titulo, autor, sinopsis, isbn, stock, id_categoria } = req.body;

    //se busca el libro por su ID
    const libro = await Book.findByPk(id);

    //si no existe, se devuelve error
    if (!libro) {
      return res.status(404).json({ mensaje: 'Libro no encontrado.' });
    }

    //actualizar campos de texto solo si se envían en la petición
    libro.titulo = titulo ?? libro.titulo;
    libro.autor = autor ?? libro.autor;
    libro.sinopsis = sinopsis ?? libro.sinopsis;
    libro.isbn = isbn ?? libro.isbn;
    libro.stock = stock ?? libro.stock;
    libro.id_categoria = id_categoria ?? libro.id_categoria;

    //actualizar portada si se subió un archivo nuevo
    if (req.file) {
      //Multer guarda el archivo en la carpeta configurada
      //y expone el nombre en req.file.filename
      libro.portada = `/img/libros/${req.file.filename}`;
    }

    //guardar cambios en la base de datos
    await libro.save();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Libro actualizado correctamente.', libro });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al actualizar libro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}