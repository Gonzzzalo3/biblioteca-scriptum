// src/controllers/reservation/getAllReservations.controller.js
import { Reservation, Exemplary, Book, User } from '../../models/index.js';

export async function getAllReservationsController(req, res) {
  try {
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
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ reservas });
  } catch (error) {
    console.error('Error al obtener todas las reservas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}