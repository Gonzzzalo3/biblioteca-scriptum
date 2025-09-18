// src/models/Recommendation.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Recommendation = sequelize.define('Recommendation', {
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

  id_libro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id',
    },
  },
}, {
  tableName: 'recommendations',
});
