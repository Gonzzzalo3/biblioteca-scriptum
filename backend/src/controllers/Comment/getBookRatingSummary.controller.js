// src/controllers/comment/getBookRatingSummary.controller.js

//Este controlador obtiene un resumen de las calificaciones de un libro específico.
//Se recibe el ID del libro como parámetro en la ruta. 
//La consulta calcula el promedio de las calificaciones y el total de comentarios visibles.
//El resultado se devuelve con dos valores: 
// - promedio: calificación media con dos decimales
// - total: cantidad de comentarios considerados en el cálculo

import { Comment } from '../../models/index.js';
import { sequelize } from '../../config/db.js';

export async function getBookRatingSummaryController(req, res) {
  try {
    const { id_libro } = req.params;

    //se calcula el promedio y el total de comentarios visibles para el libro
    const resultado = await Comment.findOne({
      where: { id_libro, visible: true },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('calificacion')), 'promedio'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total']
      ],
      raw: true
    });

    //respuesta exitosa con los valores calculados
    res.status(200).json({
      promedio: parseFloat(resultado.promedio || 0).toFixed(2),
      total: parseInt(resultado.total || 0)
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener resumen de calificaciones:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}