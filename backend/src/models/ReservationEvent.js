// src/models/ReservationEvent.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { RESERVATION_ACTIONS } from '../config/constants.js';

export const ReservationEvent = sequelize.define('ReservationEvent', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'reservations',
      key: 'id',
    },
  },

  accion: {
    type: DataTypes.ENUM(...Object.values(RESERVATION_ACTIONS)),
    allowNull: false,
  },
}, {
  tableName: 'reservation_events',
});
