// src/controllers/reservation/createReservation.controller.js
import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function createReservationController(req, res) {
  try {
    const { id_ejemplar, fecha_fin } = req.body;
    const id_usuario = req.usuario.id;

    const ejemplar = await Exemplary.findByPk(id_ejemplar);
    if (!ejemplar || ejemplar.estado !== EXEMPLARY_STATUS.DISPONIBLE) {
      return res.status(400).json({ mensaje: 'Ejemplar no disponible para reserva.' });
    }

    const reserva = await Reservation.create({
      id_usuario,
      id_ejemplar,
      fecha_fin,
      estado: RESERVATION_STATUS.RESERVADO
    });

    ejemplar.estado = EXEMPLARY_STATUS.RESERVADO;
    await ejemplar.save();
    await syncBookStock(ejemplar.id_libro);

    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.RESERVAR
    });

    res.status(201).json({ mensaje: 'Reserva creada correctamente.', reserva });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}