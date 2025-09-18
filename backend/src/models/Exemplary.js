// src/models/Exemplary.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { EXEMPLARY_STATUS } from '../config/constants.js';

export const Exemplary = sequelize.define('Exemplary', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  id_libro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id',
    },
  },

  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },

  estado: {
    type: DataTypes.ENUM(...Object.values(EXEMPLARY_STATUS)),
    allowNull: false,
    defaultValue: EXEMPLARY_STATUS.DISPONIBLE,
  },
}, {
  tableName: 'exemplaries',
});

Exemplary.beforeCreate((exemplary) => {
  if (exemplary.codigo) {
    exemplary.codigo = exemplary.codigo.trim().toUpperCase();
  }
});

Exemplary.beforeUpdate((exemplary) => {
  if (exemplary.changed('codigo')) {
    exemplary.codigo = exemplary.codigo.trim().toUpperCase();
  }
});

Exemplary.prototype.estaDisponible = function () {
  return this.estado === EXEMPLARY_STATUS.DISPONIBLE;
};
