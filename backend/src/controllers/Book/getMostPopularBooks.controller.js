  import { Book, Category } from '../../models/index.js';
  import { sequelize } from '../../config/db.js';
  import { config } from '../../config/env.js';

  export async function getMostPopularBooksController(req, res) {
    try {
      const baseUrl = config.baseUrl;

      const libros = await Book.findAll({
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*) 
                FROM recommendations 
                WHERE recommendations.id_libro = Book.id
              )`),
              'recomendaciones'
            ]
          ]
        },
        include: {
          model: Category,
          attributes: ['nombre']
        },
        order: [[sequelize.literal('recomendaciones'), 'DESC']],
        limit: 10
      });

      // Convertir a JSON y agregar URL completa a portada
      const librosConUrl = libros.map(libro => {
        const data = libro.toJSON();
        return {
          ...data,
          portadaUrl: data.portada ? `${baseUrl}${data.portada}` : null
        };
      });

      res.status(200).json({ libros: librosConUrl });
    } catch (error) {
      console.error('Error al obtener libros populares:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
  }