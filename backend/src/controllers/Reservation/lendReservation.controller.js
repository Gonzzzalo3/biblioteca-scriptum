// src/controllers/reservation/lendReservation.controller.js

//Este controlador permite cambiar el estado de una reserva de `RESERVADO` a `PRESTADO`.
//La lógica incluye varias validaciones y actualizaciones:
// - Verificar que la reserva exista y esté en estado `RESERVADO`.
// - Cambiar el estado del ejemplar asociado a `PRESTADO`.
// - Actualizar la reserva a estado `PRESTADO` y asignar una fecha de finalización
//   de 14 días a partir de la fecha actual (plazo de préstamo).
// - Sincronizar el stock del libro correspondiente.
// - Registrar un evento de tipo `PRESTAR` en la tabla `ReservationEvent`.
//Finalmente, se devuelve la reserva actualizada junto con un mensaje de confirmación.

import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function lendReservationController(req, res) {
  try {
    const { id } = req.params;

    //se busca la reserva por su ID
    const reserva = await Reservation.findByPk(id);

    //validación: la reserva debe existir y estar en estado "reservado"
    if (!reserva || reserva.estado !== RESERVATION_STATUS.RESERVADO) {
      return res.status(400).json({ mensaje: 'La reserva no está en estado válido para préstamo.' });
    }

    //se busca el ejemplar asociado a la reserva
    const ejemplar = await Exemplary.findByPk(reserva.id_ejemplar);
    if (ejemplar) {
      ejemplar.estado = EXEMPLARY_STATUS.PRESTADO;
      await ejemplar.save();
    }

    //actualizar estado de la reserva a "prestado" y asignar fecha de devolución (14 días)
    reserva.estado = RESERVATION_STATUS.PRESTADO;
    const fechaFin = new Date();
    fechaFin.setDate(fechaFin.getDate() + 14); //plazo de 14 días
    reserva.fecha_fin = fechaFin;

    //guardar cambios en la reserva
    await reserva.save();

    //sincronizar stock del libro asociado
    await syncBookStock(ejemplar.id_libro);

    //registrar evento de préstamo en el historial
    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.PRESTAR
    });

    //respuesta exitosa con la reserva actualizada
    res.status(200).json({ 
      mensaje: 'Ejemplar prestado correctamente.', 
      reserva 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al prestar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}