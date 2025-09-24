// src/controllers/reservation/getActiveReservations.controller.js
import { Reservation, Exemplary, Book, User } from '../../models/index.js';
import { RESERVATION_STATUS } from '../../config/constants.js';
import { config } from '../../config/env.js';

export async function getActiveReservationsController(req, res) {
  try {
    const baseUrl = config.baseUrl;

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
          attributes: ['id', 'nombres', 'apellidos', 'img']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Transformar portada e imagen de usuario en URLs completas
    const reservasConUrls = reservas.map((reserva) => {
      const r = reserva.toJSON();

      const libro = r.Exemplary?.Book;
      if (libro?.portada) {
        r.Exemplary.Book.portadaUrl = `${baseUrl}${libro.portada}`;
      } else {
        r.Exemplary.Book.portadaUrl = `${baseUrl}/img/libros/default.jpg`;
      }

      const usuario = r.User;
      if (usuario?.img) {
        r.User.imgUrl = `${baseUrl}${usuario.img}`;
      } else {
        r.User.imgUrl = `${baseUrl}/img/usuarios/default.jpg`;
      }

      return r;
    });

    res.status(200).json({ reservas: reservasConUrls });
  } catch (error) {
    console.error('Error al obtener reservas activas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}