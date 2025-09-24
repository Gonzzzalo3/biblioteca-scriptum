// src/utils/syncBookStock.js

//Este archivo se encarga de mantener sincronizado el stock de un libro.
//La idea es que cada vez que cambie el estado de un ejemplar (disponible, prestado, etc.),
//se actualice automáticamente el campo "stock" del libro con la cantidad real de ejemplares disponibles.

import { Book, Exemplary } from '../models/index.js';
import { EXEMPLARY_STATUS } from '../config/constants.js';

//Función que sincroniza el stock de un libro específico
export async function syncBookStock(bookId) {
  try {
    //Se cuenta cuántos ejemplares del libro están en estado "DISPONIBLE"
    const availableCount = await Exemplary.count({
      where: {
        id_libro: bookId,
        estado: EXEMPLARY_STATUS.DISPONIBLE
      }
    });

    //Se actualiza el campo "stock" del libro con la cantidad disponible
    await Book.update({ stock: availableCount }, { where: { id: bookId } });
  } catch (error) {
    //Si ocurre un error, se muestra en consola
    console.error('Error al sincronizar el stock del libro:', error);
  }
}