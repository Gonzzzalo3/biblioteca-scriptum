// src/controllers/reservation/getUserReservations.controller.js
import { Reservation, Exemplary, Book, User } from '../../models/index.js';

export async function getUserReservationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;

    const reservas = await Reservation.findAll({
      where: { id_usuario },
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
    console.error('Error al obtener reservas del usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}