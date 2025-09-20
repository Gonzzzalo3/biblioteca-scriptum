// src/controllers/reservation/getActiveReservations.controller.js
import { Reservation, Exemplary, Book, User } from '../../models/index.js';
import { RESERVATION_STATUS } from '../../config/constants.js';

export async function getActiveReservationsController(req, res) {
  try {
    const reservas = await Reservation.findAll({
      where: {
        estado: [RESERVATION_STATUS.RESERVADO, RESERVATION_STATUS.PRESTADO]
      },
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
          attributes: ['nombres', 'apellidos', 'img']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ reservas });
  } catch (error) {
    console.error('Error al obtener reservas activas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}