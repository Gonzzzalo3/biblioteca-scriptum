// src/models/Reservation.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { RESERVATION_STATUS } from '../config/constants.js';

export const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },

  id_ejemplar: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'exemplaries',
      key: 'id',
    },
  },

  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  estado: {
    type: DataTypes.ENUM(...Object.values(RESERVATION_STATUS)),
    allowNull: false,
    defaultValue: RESERVATION_STATUS.RESERVADO,
  },
}, {
  tableName: 'reservations',
});
