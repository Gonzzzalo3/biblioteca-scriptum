// src/controllers/book/createBook.controller.js
import { Book, Exemplary } from '../../models/index.js';
import { EXEMPLARY_STATUS } from '../../config/constants.js';

export async function createBookController(req, res) {
  try {
    const { titulo, autor, sinopsis, isbn, stock, id_categoria } = req.body;
    const portada = req.file ? `/img/libros/${req.file.filename}` : null;

    if (!titulo || !autor || !isbn || !id_categoria) {
      return res
        .status(400)
        .json({ mensaje: "Campos obligatorios faltantes." });
    }

    // Crear el libro
    const nuevoLibro = await Book.create({
      titulo,
      autor,
      sinopsis,
      portada,
      isbn,
      stock: Number(stock) || 0,
      id_categoria,
    });

    // Crear ejemplares automáticamente según el stock
    const ejemplares = [];
    for (let i = 1; i <= nuevoLibro.stock; i++) {
      ejemplares.push({
        id_libro: nuevoLibro.id,
        codigo: `LIB-${nuevoLibro.id}-${i}`,
        estado: EXEMPLARY_STATUS.DISPONIBLE,
      });
    }

    if (ejemplares.length > 0) {
      await Exemplary.bulkCreate(ejemplares, { individualHooks: true });
    }

    res.status(201).json({
      mensaje: "Libro y ejemplares creados correctamente.",
      libro: nuevoLibro,
    });
  } catch (error) {
    console.error("Error al crear libro:");
    console.error("Nombre:", error.name);
    console.error("Mensaje:", error.message);
    if (error.errors) {
      console.error("Errores:", error.errors.map((e) => e.message));
    }
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
}