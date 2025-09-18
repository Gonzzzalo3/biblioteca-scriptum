// src/seeders/06-recommendations.seeder.js
import { Recommendation } from '../models/index.js';

export async function seedRecomendaciones() {
  await Recommendation.bulkCreate([
    // Recomendaciones para Luis (id_usuario: 2)
    {
      id_usuario: 2,
      id_libro: 5 // Sapiens
    },
    {
      id_usuario: 2,
      id_libro: 10 // El señor de los anillos
    },
    {
      id_usuario: 2,
      id_libro: 17 // Bajo la misma estrella
    },

    // Recomendaciones para María (id_usuario: 3)
    {
      id_usuario: 3,
      id_libro: 4 // Dune
    },
    {
      id_usuario: 3,
      id_libro: 7 // Mi planta de naranja lima
    },
    {
      id_usuario: 3,
      id_libro: 13 // Cien años de soledad
    },

    // Recomendaciones para Jorge (id_usuario: 4)
    {
      id_usuario: 4,
      id_libro: 3 // Pedagogía del oprimido
    },
    {
      id_usuario: 4,
      id_libro: 6 // El diseño de todos los días
    },
    {
      id_usuario: 4,
      id_libro: 20 // Fundación
    }
  ]);
  console.log('Recomendaciones insertadas correctamente');
}