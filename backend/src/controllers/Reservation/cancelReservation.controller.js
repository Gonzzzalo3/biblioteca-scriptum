// src/controllers/reservation/cancelReservation.controller.js

//Este controlador permite a un usuario autenticado cancelar una de sus reservas activas.
//La lógica incluye varias validaciones:
// - Verificar que la reserva exista.
// - Confirmar que la reserva pertenece al usuario autenticado.
// - Validar que la reserva esté en estado `RESERVADO` (solo reservas activas pueden cancelarse).
//
//Si la reserva es válida, se actualiza el estado del ejemplar asociado a `DISPONIBLE`,
//se sincroniza el stock del libro correspondiente y se cambia el estado de la reserva a `CANCELADO`.
//Además, se registra un evento de cancelación en la tabla `ReservationEvent` para mantener el historial.
//Finalmente, se devuelve la reserva actualizada junto con un mensaje de confirmación.

import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function cancelReservationController(req, res) {
  try {
    const { id } = req.params;
    const id_usuario = req.usuario.id;

    //se busca la reserva por su ID, incluyendo el ejemplar asociado
    const reserva = await Reservation.findByPk(id, {
      include: { model: Exemplary }
    });

    //si la reserva no existe, se devuelve error
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
    }

    //validación: la reserva debe pertenecer al usuario autenticado
    if (reserva.id_usuario !== id_usuario) {
      return res.status(403).json({ mensaje: 'No tienes permiso para cancelar esta reserva.' });
    }

    //validación: solo se pueden cancelar reservas activas
    if (reserva.estado !== RESERVATION_STATUS.RESERVADO) {
      return res.status(400).json({ mensaje: 'Solo puedes cancelar reservas activas.' });
    }

    //si existe ejemplar asociado, se libera y se actualiza el stock del libro
    const ejemplar = reserva.Exemplary;
    if (ejemplar) {
      ejemplar.estado = EXEMPLARY_STATUS.DISPONIBLE;
      await ejemplar.save();
      await syncBookStock(ejemplar.id_libro);
    }

    //se actualiza el estado de la reserva a "cancelado"
    reserva.estado = RESERVATION_STATUS.CANCELADO;
    await reserva.save();

    //se registra el evento de cancelación en el historial
    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.CANCELAR
    });

    //respuesta exitosa con la reserva actualizada
    res.status(200).json({ 
      mensaje: 'Reserva cancelada correctamente.', 
      reserva 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al cancelar reserva:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}