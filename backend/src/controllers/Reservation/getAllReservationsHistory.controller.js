// src/controllers/reservation/getAllReservationHistory.controller.js
import { Reservation, ReservationEvent, Exemplary, Book, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getAllReservationHistoryController(req, res) {
  try {
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

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
      order: [['createdAt', 'DESC']]
    });

    if (!eventos.length) {
      return res.status(200).json({ historial: [] });
    }

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

    res.status(200).json({ historial });
  } catch (error) {
    console.error('Error al obtener historial completo:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}