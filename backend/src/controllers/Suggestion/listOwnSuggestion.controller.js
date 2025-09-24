// src/controllers/suggestion/listOwnSuggestion.controller.js

//Este controlador permite a un usuario autenticado listar todas sus propias sugerencias.
//La consulta incluye:
// - Las sugerencias creadas por el usuario autenticado.
// - Información básica del usuario asociado (nombres, apellidos, imagen).
//
//Los resultados se devuelven ordenados por fecha de creación en orden descendente (más recientes primero).
//Además, se transforma la ruta relativa de la imagen del usuario en una URL completa,
//asignando una imagen por defecto en caso de no existir.
//Finalmente, se devuelve la lista de sugerencias enriquecida para el frontend.

import { Suggestion, User } from '../../models/index.js';
import { config } from '../../config/env.js';

export async function listOwnSuggestionController(req, res) {
  try {
    const id_usuario = req.usuario.id;
    const baseUrl = config.baseUrl || `${req.protocol}://${req.get('host')}`;

    //se buscan todas las sugerencias del usuario autenticado
    const sugerencias = await Suggestion.findAll({
      where: { id_usuario },
      include: {
        model: User,
        attributes: ['nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    //transformar imagen de usuario en URL completa, con fallback a imagen por defecto
    const sugerenciasConUrl = sugerencias.map(s => {
      const data = s.toJSON();
      const imgRelativa = data.User?.img?.startsWith('/')
        ? data.User.img
        : `/${data.User?.img || ''}`;

      return {
        ...data,
        User: {
          ...data.User,
          imgUrl: data.User?.img
            ? `${baseUrl}${imgRelativa}`
            : `${baseUrl}/img/usuarios/default.jpg`
        }
      };
    });

    //respuesta exitosa con la lista de sugerencias del usuario
    res.status(200).json({ sugerencias: sugerenciasConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al listar sugerencias propias:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}