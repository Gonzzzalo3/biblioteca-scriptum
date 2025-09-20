// src/utils/syncBookStock.js

import { Book, Exemplary } from '../models/index.js';
import { EXEMPLARY_STATUS } from '../config/constants.js';

export async function syncBookStock(bookId) {
  try {
    const availableCount = await Exemplary.count({
      where: {
        id_libro: bookId,
        estado: EXEMPLARY_STATUS.DISPONIBLE
      }
    });

    await Book.update({ stock: availableCount }, { where: { id: bookId } });
  } catch (error) {
    console.error('Error syncing book stock:', error);
  }
}