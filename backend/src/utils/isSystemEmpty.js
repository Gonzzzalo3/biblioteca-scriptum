// src/utils/isSystemEmpty.js

//Este archivo sirve para verificar si el sistema (la base de datos) está vacío.
//La idea es comprobar si no existen registros en las tablas principales,
//y en ese caso poder inicializar los seeders con datos por defecto.

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

//Función que revisa si todas las tablas están vacías
export async function isSystemEmpty() {
  //Se ejecutan todas las consultas de conteo en paralelo para optimizar el tiempo
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

  //Se devuelve true solo si todas las tablas están vacías
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