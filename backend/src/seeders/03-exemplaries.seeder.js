// src/seeders/03-exemplaries.seeder.js
import { Book, Exemplary } from '../models/index.js';
import { EXEMPLARY_STATUS } from '../config/constants.js';

export async function seedEjemplares() {
  const libros = await Book.findAll();

  const ejemplares = [];

  for (const libro of libros) {
    for (let i = 1; i <= libro.stock; i++) {
      ejemplares.push({
        id_libro: libro.id,
        codigo: `LIB-${libro.id}-${i}`,
        estado: EXEMPLARY_STATUS.DISPONIBLE
      });
    }
  }

  await Exemplary.bulkCreate(ejemplares);
  console.log('Ejemplares insertados correctamente');
}