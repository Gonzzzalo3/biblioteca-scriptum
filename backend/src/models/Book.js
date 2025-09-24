// src/models/Book.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

/*
Modelo de Libro: representa los libros que forman parte de la biblioteca.
Cada libro pertenece a una categoría, tiene un título, un autor, una sinopsis,
una portada, un ISBN único y un stock disponible.

Este modelo se relaciona con los ejemplares físicos que se pueden prestar.
*/

export const Book = sequelize.define('Book', {
  // identificador único autoincremental
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  // referencia a la categoría a la que pertenece el libro
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false, // obligatorio
    references: {
      model: 'categories', // tabla de categorías
      key: 'id',
    },
  },

  // título del libro
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false, // obligatorio
  },

  // autor del libro
  autor: {
    type: DataTypes.STRING(100),
    allowNull: false, // obligatorio
  },

  // sinopsis o descripción del libro
  sinopsis: {
    type: DataTypes.TEXT,
    allowNull: true, // opcional
  },

  // ruta de la portada del libro
  portada: {
    type: DataTypes.STRING(255),
    allowNull: true, // opcional
  },

  // código ISBN único
  isbn: {
    type: DataTypes.STRING(20),
    allowNull: false, // obligatorio
    unique: true, // no se puede repetir
  },

  // cantidad de ejemplares disponibles
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0, // por defecto no hay stock
    validate: {
      min: 0, // no puede ser negativo
    },
  },
}, {
  tableName: 'books', // nombre de la tabla en la base de datos
});

// Hooks de Sequelize: se ejecutan antes de crear o actualizar un libro

// Antes de crear un libro
Book.beforeCreate((book) => {
  // se limpian espacios en blanco en título y autor
  if (book.titulo) book.titulo = book.titulo.trim();
  if (book.autor) book.autor = book.autor.trim();

  // si no se subió portada, se asigna la imagen por defecto
  if (!book.portada || book.portada.trim() === '') {
    book.portada = '/img/libros/default.jpg';
  }
});

// Antes de actualizar un libro
Book.beforeUpdate((book) => {
  // si cambió el título o autor, se limpian espacios
  if (book.changed('titulo')) book.titulo = book.titulo.trim();
  if (book.changed('autor')) book.autor = book.autor.trim();

  // si la portada se cambió a vacío, se asigna la imagen por defecto
  if (book.changed('portada') && (!book.portada || book.portada.trim() === '')) {
    book.portada = '/img/libros/default.jpg';
  }
});

// Método de instancia: devuelve true si el libro tiene stock disponible
Book.prototype.estaDisponible = function () {
  return this.stock > 0;
};