// src/controllers/reservation/lendReservation.controller.js
import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function lendReservationController(req, res) {
  try {
    const { id } = req.params;

    const reserva = await Reservation.findByPk(id);
    if (!reserva || reserva.estado !== RESERVATION_STATUS.RESERVADO) {
      return res.status(400).json({ mensaje: 'La reserva no está en estado válido para préstamo.' });
    }

    const ejemplar = await Exemplary.findByPk(reserva.id_ejemplar);
    if (ejemplar) {
      ejemplar.estado = EXEMPLARY_STATUS.PRESTADO;
      await ejemplar.save();
    }

    reserva.estado = RESERVATION_STATUS.PRESTADO;
    await reserva.save();
    await syncBookStock(ejemplar.id_libro);

    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.PRESTAR
    });

    res.status(200).json({ mensaje: 'Ejemplar prestado correctamente.', reserva });
  } catch (error) {
    console.error('Error al prestar ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}