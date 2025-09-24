// src/controllers/reservation/getActiveReservations.controller.js

//Este controlador permite obtener todas las reservas activas en el sistema.
//Se consideran activas aquellas reservas cuyo estado es `RESERVADO` o `PRESTADO`.
//La consulta incluye:
// - El ejemplar reservado, junto con los datos básicos del libro (título, autor, portada).
// - El usuario que realizó la reserva, con sus datos principales (id, nombres, apellidos, imagen).
//
//Los resultados se devuelven ordenados por fecha de creación (más recientes primero).
//Además, se transforman las rutas relativas de portada de libro e imagen de usuario en URLs completas,
//asignando imágenes por defecto en caso de no existir.
//Finalmente, se devuelve la lista de reservas activas enriquecida para el frontend.

import { Reservation, Exemplary, Book, User } from '../../models/index.js';
import { RESERVATION_STATUS } from '../../config/constants.js';
import { config } from '../../config/env.js';

export async function getActiveReservationsController(req, res) {
  try {
    const baseUrl = config.baseUrl;

    //se buscan todas las reservas activas (reservadas o prestadas)
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
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //transformar portada de libro e imagen de usuario en URLs completas
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

    //respuesta exitosa con la lista de reservas activas
    res.status(200).json({ reservas: reservasConUrls });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener reservas activas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}