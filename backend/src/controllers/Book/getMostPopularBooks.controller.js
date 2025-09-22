import { Book, Category } from '../../models/index.js';
import { sequelize } from '../../config/db.js';

export async function getMostPopularBooksController(req, res) {
  try {
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
        model: Category,           // igual que en getBookDetailController
        attributes: ['nombre']     // solo el nombre de la categoría
      },
      order: [[sequelize.literal('recomendaciones'), 'DESC']],
      limit: 10
    });

    res.status(200).json({ libros });
  } catch (error) {
    console.error('Error al obtener libros populares:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
}