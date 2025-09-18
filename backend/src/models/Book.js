// src/models/Libro.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
      }
      
  },

  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id',
    },
  },
}, {
  tableName: 'libros',
});

Libro.beforeCreate((libro) => {
    if (libro.titulo) libro.titulo = libro.titulo.trim();
    if (libro.autor) libro.autor = libro.autor.trim();
  });
  
  Libro.beforeUpdate((libro) => {
    if (libro.changed('titulo')) libro.titulo = libro.titulo.trim();
    if (libro.changed('autor')) libro.autor = libro.autor.trim();
  });  

Libro.beforeCreate((libro) => {
    if (!libro.portada) {
        libro.portada = '/public/img/default.jpg';
    }
  });
  
  Libro.prototype.estaDisponible = function () {
    return this.stock > 0;
  };
  
