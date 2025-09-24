// src/models/Recommendation.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/*
Modelo de Recomendación: representa las sugerencias que el sistema le hace a un usuario.
Estas recomendaciones se generan en base a los libros que el usuario ya ha visto,
consultado o accedido dentro de la biblioteca.

Cada registro vincula a un usuario con un libro recomendado por el sistema.
De esta manera se puede construir un historial de recomendaciones personalizadas.
*/

export const Recommendation = sequelize.define('Recommendation', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia al usuario que recibe la recomendación
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'users', // tabla de usuarios
      key: 'id',
    },
  },

  // referencia al libro que el sistema recomienda al usuario
  id_libro: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'books', // tabla de libros
      key: 'id',
    },
  },
}, {
  tableName: 'recommendations', // nombre de la tabla en la base de datos
});