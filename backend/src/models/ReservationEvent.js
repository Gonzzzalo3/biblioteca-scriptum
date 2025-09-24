// src/models/ReservationEvent.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { RESERVATION_ACTIONS } from '../config/constants.js';

/*
Modelo de Evento de Reserva: se utiliza para auditoría.
Registra cada acción que ocurre sobre una reserva, de manera que se pueda
llevar un historial detallado de lo que pasó con ella.

Ejemplo: cuándo se creó la reserva, cuándo se confirmó el préstamo,
cuándo se devolvió el ejemplar, si se canceló, etc.

Esto permite tener trazabilidad completa de las reservas y facilita
el seguimiento de acciones realizadas por usuarios o bibliotecarios.
*/

export const ReservationEvent = sequelize.define('ReservationEvent', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia a la reserva sobre la que se registra la acción
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'reservations', // tabla de reservas
      key: 'id',
    },
  },

  // acción realizada sobre la reserva (crear, prestar, devolver, cancelar, etc.)
  accion: {
    type: DataTypes.ENUM(...Object.values(RESERVATION_ACTIONS)),
    allowNull: false, // obligatorio
  },
}, {
  tableName: 'reservation_events', // nombre de la tabla en la base de datos
});