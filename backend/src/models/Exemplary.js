// src/models/Exemplary.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { EXEMPLARY_STATUS } from '../config/constants.js';

/*
Modelo de Ejemplar: representa una copia física (o digital) de un libro.
Cada ejemplar pertenece a un libro específico y se identifica con un código único.
El estado del ejemplar indica si está disponible, prestado, reservado, etc.
*/

export const Exemplary = sequelize.define('Exemplary', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia al libro al que pertenece este ejemplar
  id_libro: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'books', // tabla de libros
      key: 'id',
    },
  },

  // código único que identifica al ejemplar (ej. "LIB-001-A")
  codigo: {
    type: DataTypes.STRING(20),
    allowNull: false, // obligatorio
    unique: true, // no se puede repetir
  },

  // estado actual del ejemplar (disponible, prestado, reservado, etc.)
  estado: {
    type: DataTypes.ENUM(...Object.values(EXEMPLARY_STATUS)),
    allowNull: false,
    defaultValue: EXEMPLARY_STATUS.DISPONIBLE, // por defecto está disponible
  },
}, {
  tableName: 'exemplaries', // nombre de la tabla en la base de datos
});

// Hooks de Sequelize: se ejecutan antes de crear o actualizar un ejemplar

// Antes de crear un ejemplar
Exemplary.beforeCreate((exemplary) => {
  if (exemplary.codigo) {
    // se limpia el código y se guarda en mayúsculas para mantener consistencia
    exemplary.codigo = exemplary.codigo.trim().toUpperCase();
  }
});

// Antes de actualizar un ejemplar
Exemplary.beforeUpdate((exemplary) => {
  if (exemplary.changed('codigo')) {
    // si el código cambió, también se normaliza (trim + mayúsculas)
    exemplary.codigo = exemplary.codigo.trim().toUpperCase();
  }
});

// Método de instancia: devuelve true si el ejemplar está disponible
Exemplary.prototype.estaDisponible = function () {
  return this.estado === EXEMPLARY_STATUS.DISPONIBLE;
};