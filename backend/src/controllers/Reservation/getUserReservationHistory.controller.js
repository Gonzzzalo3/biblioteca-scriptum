// src/controllers/reservation/getUserReservationHistory.controller.js

//Este controlador permite obtener el historial completo de eventos de reservas
//para un usuario autenticado en el sistema. 
//
//La consulta incluye:
// - Los eventos de reserva (`ReservationEvent`) con su acción y fecha.
// - La reserva asociada, filtrada por el usuario autenticado.
// - El ejemplar vinculado a la reserva, junto con los datos del libro (id, título, autor, portada).
// - El propio usuario que realizó la acción, con sus datos principales (id, nombres, apellidos, imagen).
//
//Los resultados se devuelven ordenados por fecha de creación descendente (eventos más recientes primero).
//Además, se transforma la ruta relativa de la portada del libro en una URL completa,
//asignando una imagen por defecto en caso de no existir.
//Finalmente, se devuelve una lista enriquecida de eventos que conforman el historial del usuario.

import { Reservation, ReservationEvent, Exemplary, Book, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getUserReservationHistoryController(req, res) {
  try {
    //validación: el usuario debe estar autenticado
    if (!req.usuario || !req.usuario.id) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado.' });
    }

    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan todos los eventos de reservas del usuario autenticado
    const eventos = await ReservationEvent.findAll({
      include: [
        {
          model: Reservation,
          required: true,
          where: { id_usuario },
          include: [
            {
              model: Exemplary,
              required: true,
              include: [
                {
                  model: Book,
                  attributes: ['id', 'titulo', 'autor', 'portada'],
                  required: false
                }
              ]
            },
            {
              model: User,
              attributes: ['id', 'nombres', 'apellidos', 'img'],
              required: false
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //si no hay eventos, se devuelve historial vacío
    if (!eventos.length) {
      return res.status(200).json({ historial: [] });
    }

    //se transforma cada evento en un objeto enriquecido con datos de libro y usuario
    const historial = eventos.map(ev => {
      const reserva = ev.Reservation;
      const ejemplar = reserva?.Exemplary;
      const libro = ejemplar?.Book;

      const portadaRelativa = libro?.portada?.startsWith('/')
        ? libro.portada
        : `/${libro?.portada || ''}`;

      return {
        id_evento: ev.id,
        id_reserva: reserva?.id || null,
        accion: ev.accion || 'desconocida',
        fecha_evento: ev.createdAt,
        estado_reserva_en_momento: reserva?.estado || 'desconocido',
        fecha_fin: reserva?.fecha_fin || null,
        libro: libro
          ? {
              id: libro.id,
              titulo: libro.titulo,
              autor: libro.autor,
              portada: libro.portada,
              portadaUrl: libro.portada
                ? `${baseUrl}${portadaRelativa}`
                : `${baseUrl}/covers/default.jpg`
            }
          : {
              id: null,
              titulo: '[Libro no disponible]',
              autor: '',
              portada: '/img/libros/default.jpg',
              portadaUrl: `${baseUrl}/covers/default.jpg`
            },
        usuario: reserva?.User
          ? {
              id: reserva.User.id,
              nombres: reserva.User.nombres,
              apellidos: reserva.User.apellidos,
              img: reserva.User.img
            }
          : null
      };
    });

    //respuesta exitosa con el historial del usuario
    res.status(200).json({ historial });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener historial de reservas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}