// src/controllers/reservation/getAllReservationHistory.controller.js

//Este controlador permite obtener el historial completo de eventos relacionados con reservas.
//Su objetivo es servir como auditoría, registrando todas las acciones realizadas sobre las reservas
//(crear, cancelar, prestar, devolver, etc.).
//
//La consulta incluye:
// - El evento de reserva (`ReservationEvent`) con su acción y fecha.
// - La reserva asociada, con su estado en el momento del evento y fecha de finalización.
// - El ejemplar vinculado a la reserva, junto con los datos del libro (id, título, autor, portada).
// - El usuario que realizó la acción, con sus datos principales (id, nombres, apellidos, imagen).
//
//Los resultados se devuelven ordenados por fecha de creación descendente (eventos más recientes primero).
//Además, se transforman las rutas relativas de portadas e imágenes de usuario en URLs completas,
//asignando valores por defecto cuando la información no está disponible.
//Finalmente, se devuelve una lista enriquecida de eventos que conforman el historial de auditoría.

import { Reservation, ReservationEvent, Exemplary, Book, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getAllReservationHistoryController(req, res) {
  try {
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan todos los eventos de reservas, incluyendo reserva, ejemplar, libro y usuario
    const eventos = await ReservationEvent.findAll({
      include: [
        {
          model: Reservation,
          required: true,
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
      const usuario = reserva?.User;

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
        usuario: usuario
          ? {
              id_usuario: usuario.id,
              nombres: usuario.nombres,
              apellidos: usuario.apellidos,
              img: usuario.img?.startsWith('/')
                ? `${baseUrl}${usuario.img}`
                : `${baseUrl}/${usuario.img || 'img/usuarios/default.jpg'}`
            }
          : {
              id_usuario: null,
              nombres: '[Usuario desconocido]',
              apellidos: '',
              img: `${baseUrl}/img/usuarios/default.jpg`
            }
      };
    });

    //respuesta exitosa con el historial completo
    res.status(200).json({ historial });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener historial completo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}