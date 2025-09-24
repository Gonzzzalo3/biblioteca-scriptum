// src/controllers/book/listAllBooks.controller.js

//Este controlador permite listar todos los libros registrados en el sistema.
//Incluye la categoría asociada a cada libro y ordena los resultados alfabéticamente por título.
//Además, construye la URL completa de la portada para que el frontend pueda acceder a la imagen.

import { Book, Category } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function listAllBooksController(req, res) {
  try {
    //se obtiene la URL base desde la configuración o desde la request
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se consultan todos los libros con su categoría asociada
    const libros = await Book.findAll({
      include: { model: Category, attributes: ["nombre"] },
      order: [["titulo", "ASC"]], //orden alfabético por título
    });

    //se transforma cada libro para incluir la URL completa de la portada
    const librosConUrl = libros.map((libro) => {
      const data = libro.toJSON();
      return {
        ...data,
        portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null,
      };
    });

    //respuesta exitosa con la lista de libros
    res.status(200).json({ libros: librosConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error("Error al listar libros:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}