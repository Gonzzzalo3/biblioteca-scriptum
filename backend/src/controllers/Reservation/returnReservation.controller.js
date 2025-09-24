// src/controllers/reservation/returnReservation.controller.js

//Este controlador permite registrar la devolución de un ejemplar prestado.
//La lógica incluye varias validaciones y actualizaciones:
// - Verificar que la reserva exista y que su estado actual sea `PRESTADO`.
// - Cambiar el estado del ejemplar asociado a `DISPONIBLE`.
// - Actualizar la reserva a estado `DEVUELTO` y limpiar la fecha de finalización (`fecha_fin`),
//   ya que al devolverse el ejemplar no queda pendiente un plazo de préstamo.
// - Sincronizar el stock del libro correspondiente.
// - Registrar un evento de tipo `DEVOLVER` en la tabla `ReservationEvent`.
//Finalmente, se devuelve la reserva actualizada junto con un mensaje de confirmación.

import { syncBookStock } from '../../utils/syncBookStock.js';
import { Reservation, Exemplary, ReservationEvent } from '../../models/index.js';
import { RESERVATION_STATUS, RESERVATION_ACTIONS, EXEMPLARY_STATUS } from '../../config/constants.js';

export async function returnReservationController(req, res) {
  try {
    const { id } = req.params;

    //se busca la reserva por su ID
    const reserva = await Reservation.findByPk(id);

    //validación: la reserva debe existir y estar en estado "prestado"
    if (!reserva || reserva.estado !== RESERVATION_STATUS.PRESTADO) {
      return res.status(400).json({ mensaje: 'La reserva no está en estado válido para devolución.' });
    }

    //se busca el ejemplar asociado a la reserva
    const ejemplar = await Exemplary.findByPk(reserva.id_ejemplar);
    if (ejemplar) {
      ejemplar.estado = EXEMPLARY_STATUS.DISPONIBLE;
      await ejemplar.save();
    }

    //actualizar estado de la reserva a "devuelto" y limpiar fecha_fin
    reserva.estado = RESERVATION_STATUS.DEVUELTO;
    reserva.fecha_fin = null; //se limpia la fecha de fin al devolver el ejemplar
    await reserva.save();

    //sincronizar stock del libro asociado
    await syncBookStock(ejemplar.id_libro);

    //registrar evento de devolución en el historial
    await ReservationEvent.create({
      id_reserva: reserva.id,
      accion: RESERVATION_ACTIONS.DEVOLVER
    });

    //respuesta exitosa con la reserva actualizada
    res.status(200).json({ 
      mensaje: 'Ejemplar devuelto correctamente.', 
      reserva 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al devolver ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}