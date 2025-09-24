// src/controllers/recommendation/generateRecommendation.controller.js

//Este controlador genera recomendaciones de libros para un usuario autenticado.
//La lógica se basa en el último libro visitado por el usuario (libro base).
//A partir de la categoría de ese libro, se buscan otros libros similares disponibles en stock.
//Se generan hasta 5 recomendaciones nuevas, evitando duplicados mediante `findOrCreate`.
//Finalmente, se depuran las recomendaciones para que el usuario conserve solo las 4 más recientes.
//Si el usuario no está autenticado o el libro base no existe, se devuelven errores claros.

import { Book, Recommendation } from '../../models/index.js';
import { Op } from 'sequelize';

export async function generateRecommendationController(req, res) {
  try {
    const { id_libro } = req.body;
    const id_usuario = req.usuario?.id;

    //validación: el usuario debe estar autenticado
    if (!id_usuario) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado.' });
    }

    //validación: se requiere el id_libro
    if (!id_libro) {
      return res.status(400).json({ mensaje: 'Falta el id_libro en la solicitud.' });
    }

    //se busca el libro base
    const libroBase = await Book.findByPk(id_libro);
    if (!libroBase) {
      return res.status(404).json({ mensaje: 'Libro base no encontrado.' });
    }

    //se buscan libros similares de la misma categoría, distintos al libro base y con stock disponible
    const librosSimilares = await Book.findAll({
      where: {
        id_categoria: libroBase.id_categoria,
        id: { [Op.ne]: libroBase.id },
        stock: { [Op.gt]: 0 }
      },
      limit: 5
    });

    //se crean recomendaciones evitando duplicados
    await Promise.all(
      librosSimilares.map(libro =>
        Recommendation.findOrCreate({
          where: { id_usuario, id_libro: libro.id }
        })
      )
    );

    //se obtienen todas las recomendaciones del usuario, ordenadas por fecha de creación
    const todas = await Recommendation.findAll({
      where: { id_usuario },
      order: [['createdAt', 'DESC']],
      attributes: ['id']
    });

    //se eliminan las más antiguas si hay más de 4
    if (todas.length > 4) {
      const idsAEliminar = todas.slice(4).map(r => r.id);
      await Recommendation.destroy({ where: { id: { [Op.in]: idsAEliminar } } });
    }

    //respuesta exitosa
    res.status(201).json({
      mensaje: 'Recomendaciones generadas y depuradas correctamente.'
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al generar recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}