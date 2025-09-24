// src/controllers/book/listAllBooks.controller.js
import { Book, Category } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function listAllBooksController(req, res) {
  try {
    console.log("Entró a listAllBooksController");
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    const libros = await Book.findAll({
      include: { model: Category, attributes: ["nombre"] },
      order: [["titulo", "ASC"]],
    });

    console.log("Cantidad de libros encontrados:", libros.length);

    const librosConUrl = libros.map((libro) => {
      const data = libro.toJSON();
      return {
        ...data,
        portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null,
      };
    });

    res.status(200).json({ libros: librosConUrl });
  } catch (error) {
    console.error("Error al listar libros:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}