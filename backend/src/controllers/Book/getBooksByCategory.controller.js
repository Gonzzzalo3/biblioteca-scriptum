// src/controllers/book/getBooksByCategory.controller.js

//Este controlador permite obtener todos los libros que pertenecen a una categoría específica.
//El ID de la categoría se recibe como parámetro en la ruta. 
//Los resultados incluyen la información de la categoría asociada y se ordenan alfabéticamente por título.
//Además, se construye la URL completa de la portada para que el frontend pueda mostrar la imagen.

import { Book, Category } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function getBooksByCategoryController(req, res) {
  try {
    const { id_categoria } = req.params;

    //se obtiene la URL base desde la configuración o desde la request
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan los libros que pertenecen a la categoría indicada
    const libros = await Book.findAll({
      where: { id_categoria },
      include: {
        model: Category,
        attributes: ['nombre']
      },
      order: [['titulo', 'ASC']] //orden alfabético por título
    });

    //se transforma cada libro para incluir la URL completa de la portada
    const librosConUrl = libros.map(libro => {
      const data = libro.toJSON();
      return {
        ...data,
        portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
      };
    });

    //respuesta exitosa con la lista de libros de la categoría
    res.status(200).json({ libros: librosConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al obtener libros por categoría:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}