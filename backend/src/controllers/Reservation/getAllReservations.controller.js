// src/controllers/reservation/getAllReservations.controller.js

//Este controlador permite obtener todas las reservas registradas en el sistema, sin importar su estado.
//La consulta incluye:
// - El ejemplar reservado, junto con los datos básicos del libro asociado (título, autor, portada).
// - El usuario que realizó la reserva, con sus datos principales (nombres, apellidos, correo e imagen).
//
//Los resultados se devuelven ordenados por fecha de creación en orden descendente (más recientes primero).
//Si la operación es exitosa, se devuelve la lista completa de reservas.
//En caso de error inesperado, se devuelve un mensaje de error 500.

import { Reservation, Exemplary, Book, User } from '../../models/index.js';

export async function getAllReservationsController(req, res) {
  try {
    //se buscan todas las reservas con sus relaciones (ejemplar, libro y usuario)
    const reservas = await Reservation.findAll({
      include: [
        {
          model: Exemplary,
          include: {
            model: Book,
            attributes: ['titulo', 'autor', 'portada']
          }
        },
        {
          model: User,
          attributes: ['nombres', 'apellidos', 'correo', 'img']
        }
      ],
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //respuesta exitosa con la lista de reservas
    res.status(200).json({ reservas });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener todas las reservas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}