// src/controllers/reservation/cancelReservation.controller.js

import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function cancelReservationController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    const reserva = await Reservation.findByPk(id);
    if (!reserva || reserva.id_usuario !== id_usuario || reserva.estado !== RESERVATION_STATUS.RESERVADO) {
      return res.status(403).json({ mensaje: 'No puedes cancelar esta reserva.' });
    }

    const ejemplar = await Exemplary.findByPk(reserva.id_ejemplar);
    if (ejemplar) {
      ejemplar.estado = EXEMPLARY_STATUS.DISPONIBLE;
      await ejemplar.save();
    }

    reserva.estado = RESERVATION_STATUS.CANCELADO;
    await reserva.save();
    await syncBookStock(ejemplar.id_libro);

    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.CANCELAR
    });

    res.status(200).json({ mensaje: 'Reserva cancelada correctamente.', reserva });
  } catch (error) {
    console.error('Error al cancelar reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}