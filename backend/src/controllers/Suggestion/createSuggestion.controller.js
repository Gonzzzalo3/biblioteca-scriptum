// src/controllers/suggestion/createSuggestion.controller.js

//Este controlador permite a un usuario autenticado crear una sugerencia dirigida al bibliotecario.
//Las sugerencias pueden ser de distintos tipos (ej. adquisición de libros, mejoras de servicio, etc.)
//y deben incluir obligatoriamente un campo `tipo` y un campo `detalles`.
//
//La lógica incluye:
// - Validar que el usuario esté autenticado (se obtiene su ID desde `req.usuario`).
// - Verificar que `tipo` y `detalles` estén presentes y que `detalles` no sea un texto vacío.
// - Crear un nuevo registro en la tabla `Suggestion` con la información proporcionada.
//Finalmente, se devuelve la sugerencia creada junto con un mensaje de confirmación.

import { Suggestion } from '../../models/index.js';

export async function createSuggestionController(req, res) {
  try {
    const { tipo, detalles } = req.body;
    const id_usuario = req.usuario.id;

    //validación: tipo y detalles son obligatorios
    if (!tipo || !detalles || detalles.trim() === '') {
      return res.status(400).json({ mensaje: 'Tipo y detalles son obligatorios.' });
    }

    //crear la sugerencia en la base de datos
    const nueva = await Suggestion.create({ tipo, detalles, id_usuario });

    //respuesta exitosa con la sugerencia creada
    res.status(201).json({ 
      mensaje: 'Sugerencia creada correctamente.', 
      sugerencia: nueva 
    });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al crear sugerencia:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}