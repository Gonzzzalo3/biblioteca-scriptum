// src/models/Suggestion.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { SUGGESTION_TYPES } from '../config/constants.js';

export const Suggestion = sequelize.define('Suggestion', {
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

  tipo: {
    type: DataTypes.ENUM(...Object.values(SUGGESTION_TYPES)),
    allowNull: false,
  },

  detalles: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'suggestions',
});