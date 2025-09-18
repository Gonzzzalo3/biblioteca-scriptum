// src/models/Book.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },

  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  autor: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  portada: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  isbn: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
}, {
  tableName: 'books',
});

Book.beforeCreate((book) => {
  if (book.titulo) book.titulo = book.titulo.trim();
  if (book.autor) book.autor = book.autor.trim();
  if (!book.portada) book.portada = '/public/img/default.jpg';
});

Book.beforeUpdate((book) => {
  if (book.changed('titulo')) book.titulo = book.titulo.trim();
  if (book.changed('autor')) book.autor = book.autor.trim();
});

Book.prototype.estaDisponible = function () {
  return this.stock > 0;
};
