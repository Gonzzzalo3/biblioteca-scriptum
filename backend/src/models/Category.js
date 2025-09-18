// src/models/Category.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'categories',
});

Category.beforeCreate((category) => {
  if (category.nombre) {
    category.nombre = category.nombre.trim().toLowerCase();
  }
});

Category.beforeUpdate((category) => {
  if (category.changed('nombre')) {
    category.nombre = category.nombre.trim().toLowerCase();
  }
});
