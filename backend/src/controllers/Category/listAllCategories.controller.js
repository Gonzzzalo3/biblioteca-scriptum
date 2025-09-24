// src/controllers/category/listAllCategories.controller.js

//Este controlador permite obtener la lista completa de categorías registradas en el sistema.
//Devuelve únicamente los campos relevantes (id, nombre, descripción) y ordena los resultados
//alfabéticamente por nombre para facilitar su visualización en el frontend.

import { Category } from '../../models/index.js';

export async function listAllCategoriesController(req, res) {
  try {
    //se consultan todas las categorías con los campos necesarios
    const categorias = await Category.findAll({
      attributes: ['id', 'nombre', 'descripcion'],
      order: [['nombre', 'ASC']] //orden alfabético por nombre
    });

    //respuesta exitosa con la lista de categorías
    res.status(200).json({ categorias });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al listar categorías:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}