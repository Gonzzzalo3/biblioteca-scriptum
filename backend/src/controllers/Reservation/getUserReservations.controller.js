// src/controllers/reservation/getUserReservations.controller.js

//Este controlador permite obtener todas las reservas realizadas por un usuario autenticado.
//La consulta incluye:
// - El ejemplar reservado, junto con los datos básicos del libro asociado (título, autor, portada).
// - El propio usuario que realizó la reserva, con sus datos principales (nombres, apellidos, imagen).
//
//Los resultados se devuelven ordenados por fecha de creación en orden descendente (más recientes primero).
//Además, se transforma la ruta relativa de la portada del libro en una URL completa,
//asignando una imagen por defecto en caso de no existir.
//Finalmente, se devuelve la lista de reservas del usuario enriquecida para el frontend.

import { Reservation, Exemplary, Book, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getUserReservationsController(req, res) {
  try {
    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan todas las reservas del usuario autenticado
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
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //transformar portada de libro en URL completa, con fallback a imagen por defecto
    const reservasConUrl = reservas.map(r => {
      const data = r.toJSON();
      const portadaRelativa = data.Exemplary?.Book?.portada?.startsWith('/')
        ? data.Exemplary.Book.portada
        : `/${data.Exemplary?.Book?.portada || ''}`;

      return {
        ...data,
        Exemplary: {
          ...data.Exemplary,
          Book: {
            ...data.Exemplary.Book,
            portadaUrl: data.Exemplary.Book?.portada
              ? `${baseUrl}${portadaRelativa}`
              : `${baseUrl}/covers/default.jpg`
          }
        }
      };
    });

    //respuesta exitosa con la lista de reservas del usuario
    res.status(200).json({ reservas: reservasConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener reservas del usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}