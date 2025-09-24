// src/models/Category.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/*
Modelo de Categoría: representa las categorías en las que se pueden clasificar los libros.
Sirve para organizar la biblioteca y facilitar la búsqueda de ejemplares.

Ejemplo: "novela", "historia", "tecnología", etc.
*/

export const Category = sequelize.define('Category', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // nombre de la categoría
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false, // obligatorio
  },

  // descripción opcional de la categoría
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true, // puede estar vacío
  },
}, {
  tableName: 'categories', // nombre de la tabla en la base de datos
});

// Hooks de Sequelize: se ejecutan antes de crear o actualizar una categoría

// Antes de crear una categoría
Category.beforeCreate((category) => {
  if (category.nombre) {
    // se limpia el nombre y se guarda en minúsculas para mantener consistencia
    category.nombre = category.nombre.trim().toLowerCase();
  }
});

// Antes de actualizar una categoría
Category.beforeUpdate((category) => {
  if (category.changed('nombre')) {
    // si el nombre cambió, también se normaliza (trim + minúsculas)
    category.nombre = category.nombre.trim().toLowerCase();
  }
});