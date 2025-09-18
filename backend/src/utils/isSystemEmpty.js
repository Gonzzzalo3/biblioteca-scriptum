// src/utils/isSystemEmpty.js
import {
  Category,
  Book,
  Exemplary,
  User,
  Comment,
  Recommendation,
  Suggestion,
  Reservation,
  ReservationEvent
} from '../models/index.js';

export async function isSystemEmpty() {
  const [
    categorias,
    libros,
    ejemplares,
    usuarios,
    comentarios,
    recomendaciones,
    sugerencias,
    reservas,
    eventosReserva
  ] = await Promise.all([
    Category.count(),
    Book.count(),
    Exemplary.count(),
    User.count(),
    Comment.count(),
    Recommendation.count(),
    Suggestion.count(),
    Reservation.count(),
    ReservationEvent.count()
  ]);

  return (
    categorias === 0 &&
    libros === 0 &&
    ejemplares === 0 &&
    usuarios === 0 &&
    comentarios === 0 &&
    recomendaciones === 0 &&
    sugerencias === 0 &&
    reservas === 0 &&
    eventosReserva === 0
  );
}