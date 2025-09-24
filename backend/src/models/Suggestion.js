// src/models/Suggestion.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { SUGGESTION_TYPES } from '../config/constants.js';

/*
Modelo de Sugerencia: representa las sugerencias que los clientes envían dentro del sistema.
Estas sugerencias están pensadas para que los bibliotecarios puedan revisarlas y tomar decisiones.

Ejemplos de sugerencias: pedir la compra de un nuevo libro, proponer mejoras en el sistema,
reportar algún problema o dar ideas generales para la biblioteca.

Cada sugerencia está asociada a un usuario (quien la envía), tiene un tipo definido
y un campo de detalles donde se describe la propuesta.
*/

export const Suggestion = sequelize.define('Suggestion', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia al usuario que envía la sugerencia
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'users', // tabla de usuarios
      key: 'id',
    },
  },

  // tipo de sugerencia (ej. nuevo libro, mejora, reporte, etc.)
  tipo: {
    type: DataTypes.ENUM(...Object.values(SUGGESTION_TYPES)),
    allowNull: false, // obligatorio
  },

  // descripción detallada de la sugerencia
  detalles: {
    type: DataTypes.TEXT,
    allowNull: false, // obligatorio
    validate: {
      notEmpty: true, // no puede estar vacío
    },
  },
}, {
  tableName: 'suggestions', // nombre de la tabla en la base de datos
});