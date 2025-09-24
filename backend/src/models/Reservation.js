// src/models/Reservation.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { RESERVATION_STATUS } from '../config/constants.js';

/*
Modelo de Reserva: representa la acción de un usuario al reservar un ejemplar de un libro.
Cada reserva conecta a un usuario con un ejemplar específico y guarda información sobre
el estado de la reserva y la fecha de finalización.

El estado puede variar entre reservado, prestado, devuelto, vencido, etc. según las reglas
definidas en RESERVATION_STATUS.
*/

export const Reservation = sequelize.define('Reservation', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia al usuario que realiza la reserva
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'users', // tabla de usuarios
      key: 'id',
    },
  },

  // referencia al ejemplar reservado
  id_ejemplar: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'exemplaries', // tabla de ejemplares
      key: 'id',
    },
  },

  // fecha en la que vence la reserva o préstamo
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true, // puede estar vacío si aún no se definió
  },

  // estado actual de la reserva (reservado, prestado, devuelto, etc.)
  estado: {
    type: DataTypes.ENUM(...Object.values(RESERVATION_STATUS)),
    allowNull: false,
    defaultValue: RESERVATION_STATUS.RESERVADO, // por defecto se crea como "reservado"
  },
}, {
  tableName: 'reservations', // nombre de la tabla en la base de datos
});