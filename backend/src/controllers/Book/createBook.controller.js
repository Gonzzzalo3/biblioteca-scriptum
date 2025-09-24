// src/controllers/book/createBook.controller.js

//Este controlador permite al bibliotecario crear un nuevo libro en el sistema.
//Además de registrar los datos principales del libro, también genera automáticamente
//los ejemplares asociados según el stock inicial indicado. 
//Cada ejemplar recibe un código único que lo identifica dentro del sistema.

import { Book, Exemplary } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function createBookController(req, res) {
  try {
    const { titulo, autor, sinopsis, isbn, stock, id_categoria } = req.body;
    const portada = req.file ? `/img/libros/${req.file.filename}` : null;

    //validación de campos obligatorios
    if (!titulo || !autor || !isbn || !id_categoria) {
      return res
        .status(400)
        .json({ mensaje: "Campos obligatorios faltantes." });
    }

    //crear el libro en la base de datos
    const nuevoLibro = await Book.create({
      titulo,
      autor,
      sinopsis,
      portada,
      isbn,
      stock: Number(stock) || 0,
      id_categoria,
    });

    //generar ejemplares automáticamente según el stock inicial
    const ejemplares = [];
    for (let i = 1; i <= nuevoLibro.stock; i++) {
      ejemplares.push({
        id_libro: nuevoLibro.id,
        codigo: `LIB-${nuevoLibro.id}-${i}`, //código único por ejemplar
        estado: EXEMPLARY_STATUS.DISPONIBLE,
      });
    }

    //guardar los ejemplares en la base de datos
    if (ejemplares.length > 0) {
      await Exemplary.bulkCreate(ejemplares, { individualHooks: true });
    }

    //respuesta exitosa
    res.status(201).json({
      mensaje: "Libro y ejemplares creados correctamente.",
      libro: nuevoLibro,
    });
  } catch (error) {
    //manejo de errores con logs detallados
    console.error("Error al crear libro:");
    console.error("Nombre:", error.name);
    console.error("Mensaje:", error.message);
    if (error.errors) {
      console.error("Errores:", error.errors.map((e) => e.message));
    }
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}