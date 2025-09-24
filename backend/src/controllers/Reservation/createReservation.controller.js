// src/controllers/reservation/createReservation.controller.js

//Este controlador permite a un usuario autenticado crear una nueva reserva de un ejemplar.
//La lógica incluye varias validaciones:
// - Verificar que el ejemplar exista y esté en estado `DISPONIBLE`.
// - Confirmar que el libro asociado tenga stock mayor a 0.
//Si las validaciones son correctas, se crea la reserva con una fecha de finalización
//automática de 3 días a partir de la fecha actual.
//
//Acciones realizadas:
// 1. Se crea la reserva con estado `RESERVADO`.
// 2. Se actualiza el estado del ejemplar a `RESERVADO`.
// 3. Se sincroniza el stock del libro asociado.
// 4. Se registra un evento de tipo `RESERVAR` en la tabla `ReservationEvent`.
//Finalmente, se devuelve la reserva creada junto con un mensaje de confirmación.

import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent, Book } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function createReservationController(req, res) {
  try {
    const { id_ejemplar } = req.body;
    const id_usuario = req.usuario.id;

    //se busca el ejemplar por su ID, incluyendo el libro asociado
    const ejemplar = await Exemplary.findByPk(id_ejemplar, {
      include: { model: Book, attributes: ['id', 'stock'] }
    });

    //validación: el ejemplar debe existir y estar disponible
    if (!ejemplar || ejemplar.estado !== EXEMPLARY_STATUS.DISPONIBLE) {
      return res.status(400).json({ mensaje: 'Ejemplar no disponible para reserva.' });
    }

    //validación: el libro debe tener stock disponible
    if (ejemplar.Book.stock <= 0) {
      return res.status(400).json({ mensaje: 'No hay stock disponible para este libro.' });
    }

    //calcular fecha de finalización de la reserva (hoy + 3 días)
    const fecha_fin = new Date();
    fecha_fin.setDate(fecha_fin.getDate() + 3);

    //crear la reserva en la base de datos
    const reserva = await Reservation.create({
      id_usuario,
      id_ejemplar,
      fecha_fin,
      estado: RESERVATION_STATUS.RESERVADO
    });

    //actualizar el estado del ejemplar a "reservado"
    ejemplar.estado = EXEMPLARY_STATUS.RESERVADO;
    await ejemplar.save();

    //sincronizar el stock del libro asociado
    await syncBookStock(ejemplar.id_libro);

    //registrar el evento de reserva en el historial
    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.RESERVAR
    });

    //respuesta exitosa con la reserva creada
    res.status(201).json({ 
      mensaje: 'Reserva creada correctamente.', 
      reserva 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al crear reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}