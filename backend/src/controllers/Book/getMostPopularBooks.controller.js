// src/controllers/book/getMostPopularBooks.controller.js

//Este controlador obtiene los libros más populares del sistema.
//La popularidad se mide en base a la cantidad de recomendaciones registradas
//en la tabla `recommendations`. Se devuelven los 10 libros con mayor número
//de recomendaciones, incluyendo su categoría y la URL completa de la portada.

import { Book, Category } from '../../models/index.js';
import { sequelize } from '../../config/db.js';
import { config } from '../../config/env.js';

export async function getMostPopularBooksController(req, res) {
  try {
    //se obtiene la URL base desde la configuración
    const baseUrl = config.baseUrl;

    //consulta de libros con conteo de recomendaciones
    const libros = await Book.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*) 
              FROM recommendations 
              WHERE recommendations.id_libro = Book.id
            )`),
            'recomendaciones' //alias para el conteo
          ]
        ]
      },
      include: {
        model: Category,
        attributes: ['nombre']
      },
      order: [[sequelize.literal('recomendaciones'), 'DESC']], //ordenar por popularidad
      limit: 10 //máximo 10 resultados
    });

    //se transforma cada libro para incluir la URL completa de la portada
    const librosConUrl = libros.map(libro => {
      const data = libro.toJSON();
      return {
        ...data,
        portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
      };
    });

    //respuesta exitosa con la lista de libros populares
    res.status(200).json({ libros: librosConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener libros populares:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}