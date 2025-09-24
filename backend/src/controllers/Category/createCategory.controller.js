// src/controllers/category/createCategory.controller.js

//Este controlador permite al bibliotecario crear una nueva categoría de libros.
//Primero valida que el nombre de la categoría sea proporcionado, ya que es obligatorio.
//Si la validación es correcta, se registra la categoría en la base de datos
//y se devuelve la información de la nueva categoría creada.

import { Category } from '../../models/index.js';

export async function createCategoryController(req, res) {
  try {
    const { nombre, descripcion } = req.body;

    //validación: el nombre de la categoría es obligatorio
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ mensaje: 'El nombre de la categoría es obligatorio.' });
    }

    //crear la nueva categoría en la base de datos
    const nuevaCategoria = await Category.create({ nombre, descripcion });

    //respuesta exitosa con la categoría creada
    res.status(201).json({ 
      mensaje: 'Categoría creada correctamente.', 
      categoria: nuevaCategoria 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al crear categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}