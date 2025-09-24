// src/controllers/suggestion/listAllSuggestion.controller.js

//Este controlador permite listar todas las sugerencias registradas en el sistema,
//sin importar el usuario que las haya creado. Está pensado para uso administrativo,
//por ejemplo, para que el bibliotecario pueda revisar todas las propuestas enviadas.
//
//La consulta incluye:
// - Todas las sugerencias ordenadas por fecha de creación descendente.
// - Información básica del usuario que envió cada sugerencia (id, nombres, apellidos, imagen).
//
//Además, se transforma la ruta relativa de la imagen del usuario en una URL completa,
//asignando una imagen por defecto en caso de no existir.
//Finalmente, se devuelve la lista enriquecida de sugerencias para el frontend.

import { Suggestion, User } from '../../models/index.js';

export async function listAllSuggestionController(req, res) {
  try {
    //se buscan todas las sugerencias con datos del usuario asociado
    const sugerencias = await Suggestion.findAll({
      include: {
        model: User,
        attributes: ['id', 'nombres', 'apellidos', 'img']
      },
      order: [['createdAt', 'DESC']] //ordenar por fecha de creación descendente
    });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    //transformar imagen de usuario en URL completa, con fallback a imagen por defecto
    const sugerenciasConUrl = sugerencias.map((s) => {
      const data = s.toJSON();
      return {
        ...data,
        User: {
          ...data.User,
          imgUrl: data.User?.img
            ? `${baseUrl}${data.User.img}`
            : `${baseUrl}/img/usuarios/default.jpg`
        }
      };
    });

    //respuesta exitosa con la lista de sugerencias
    res.status(200).json({ sugerencias: sugerenciasConUrl });
  } catch (error) {
    //manejo de errores inesperados
    console.error('Error al listar todas las sugerencias:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}