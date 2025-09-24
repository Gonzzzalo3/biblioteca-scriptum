// src/controllers/category/updateCategory.controller.js

//Este controlador permite al bibliotecario actualizar la información de una categoría existente.
//Primero valida que la categoría exista en la base de datos. 
//Si no existe, devuelve un error 404. 
//Si existe, actualiza los campos enviados en la petición (nombre y/o descripción)
//y guarda los cambios en la base de datos.

import { Category } from '../../models/index.js';

export async function updateCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    //se busca la categoría por su ID
    const categoria = await Category.findByPk(id);

    //si no existe, se devuelve error
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    //actualizar solo los campos enviados en la petición
    categoria.nombre = nombre ?? categoria.nombre;
    categoria.descripcion = descripcion ?? categoria.descripcion;

    //guardar cambios en la base de datos
    await categoria.save();

    //respuesta exitosa con la categoría actualizada
    res.status(200).json({ 
      mensaje: 'Categoría actualizada correctamente.', 
      categoria 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}