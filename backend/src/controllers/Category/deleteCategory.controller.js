// src/controllers/category/deleteCategory.controller.js

//Este controlador permite al bibliotecario eliminar una categoría existente.
//Primero valida que la categoría exista en la base de datos. 
//Si no existe, devuelve un error 404. 
//Si existe, la elimina de forma permanente y devuelve una confirmación al cliente.

import { Category } from '../../models/index.js';

export async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;

    //se busca la categoría por su ID
    const categoria = await Category.findByPk(id);

    //si no existe, se devuelve error
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
    }

    //se elimina la categoría de la base de datos
    await categoria.destroy();

    //respuesta exitosa
    res.status(200).json({ mensaje: 'Categoría eliminada correctamente.' });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}