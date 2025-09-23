import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function cancelReservationController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    const reserva = await Reservation.findByPk(id, {
      include: { model: Exemplary }
    });

    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    if (reserva.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No tienes permiso para cancelar esta reserva.' });
    }

    if (reserva.estado !== RESERVATION_STATUS.RESERVADO) {
      return res.status(400).json({ mensaje: 'Solo puedes cancelar reservas activas.' });
    }

    const ejemplar = reserva.Exemplary;
    if (ejemplar) {
      ejemplar.estado = EXEMPLARY_STATUS.DISPONIBLE;
      await ejemplar.save();
      await syncBookStock(ejemplar.id_libro);
    }

    reserva.estado = RESERVATION_STATUS.CANCELADO;
    await reserva.save();

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