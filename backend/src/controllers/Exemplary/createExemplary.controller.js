// src/controllers/exemplary/createExemplary.controller.js

//Este controlador permite al bibliotecario registrar un nuevo ejemplar de un libro en el sistema.
//Se requiere el ID del libro al que pertenece el ejemplar y un código único que lo identifique.
//Si faltan campos obligatorios, devuelve un error 400. 
//Si la creación es exitosa, devuelve el ejemplar recién creado junto con un mensaje de confirmación.

import { Exemplary } from '../../models/index.js';

export async function createExemplaryController(req, res) {
  try {
    const { id_libro, codigo } = req.body;

    //validación: ambos campos son obligatorios
    if (!id_libro || !codigo) {
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios.' });
    }

    //crear el nuevo ejemplar en la base de datos
    const nuevo = await Exemplary.create({ id_libro, codigo });

    //respuesta exitosa con el ejemplar creado
    res.status(201).json({ 
      mensaje: 'Ejemplar creado correctamente.', 
      ejemplar: nuevo 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al crear ejemplar:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}