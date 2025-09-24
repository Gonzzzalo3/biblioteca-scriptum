// src/models/Comment.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/*
Modelo de Comentario: representa las reseñas o comentarios que los usuarios
pueden dejar en los libros. Cada comentario está asociado a un usuario y a un libro.

Incluye el contenido del comentario, una calificación numérica y un flag de visibilidad
para poder ocultarlo sin necesidad de eliminarlo de la base de datos.
*/

export const Comment = sequelize.define('Comment', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia al usuario que hizo el comentario
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'users', // tabla de usuarios
      key: 'id',
    },
  },

  // referencia al libro sobre el que se hace el comentario
  id_libro: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'books', // tabla de libros
      key: 'id',
    },
  },

  // contenido del comentario escrito por el usuario
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false, // obligatorio
    validate: {
      notEmpty: true, // no puede estar vacío
    },
  },

  // calificación numérica del libro (1 a 5)
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    validate: {
      min: 1, // mínimo 1
      max: 5, // máximo 5
    },
  },

  // indica si el comentario es visible o está oculto
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // por defecto es visible
  },
}, {
  tableName: 'comments', // nombre de la tabla en la base de datos
});