// src/controllers/recommendation/clearOldRecommendations.controller.js

//Este controlador elimina recomendaciones obsoletas para un usuario autenticado.
//La lógica consiste en identificar los libros que el usuario ya ha reservado
//y eliminar de sus recomendaciones aquellos títulos que ya no tienen sentido sugerir.
//Si el usuario no tiene reservas, simplemente devuelve un mensaje indicando que no hay nada que limpiar.
//Si existen reservas, se eliminan las recomendaciones asociadas a esos libros.
//Finalmente, devuelve la cantidad de recomendaciones eliminadas junto con un mensaje de confirmación.

import { Recommendation, Reservation, Exemplary } from '../../models/index.js';
import { Op } from 'sequelize';

export async function clearOldRecommendationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    //obtener las reservas del usuario, incluyendo el libro asociado a cada ejemplar
    const reservas = await Reservation.findAll({
      where: { id_usuario },
      include: {
        model: Exemplary,
        attributes: ['id_libro']
      }
    });

    //extraer los IDs de libros reservados, eliminando valores nulos o indefinidos
    const librosReservados = reservas
      .map(r => r.Exemplary?.id_libro)
      .filter(Boolean);

    //si no hay libros reservados, no hay recomendaciones que limpiar
    if (librosReservados.length === 0) {
      return res.status(200).json({
        mensaje: 'No hay recomendaciones obsoletas para eliminar.',
        eliminadas: 0
      });
    }

    //eliminar recomendaciones asociadas a libros ya reservados por el usuario
    const eliminadas = await Recommendation.destroy({
      where: {
        id_usuario,
        id_libro: { [Op.in]: librosReservados }
      }
    });

    //respuesta exitosa con la cantidad de recomendaciones eliminadas
    res.status(200).json({
      mensaje: 'Recomendaciones obsoletas eliminadas correctamente.',
      eliminadas
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al limpiar recomendaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}