// src/seeders/01-categories.seeder.js
import { Category } from '../models/index.js';

export async function seedCategorias() {
  await Category.bulkCreate([
    {
      nombre: 'Tecnología',
      descripcion: 'Libros sobre programación, software y hardware.',
    },
    {
      nombre: 'Educación',
      descripcion: 'Material pedagógico y didáctico para docentes y estudiantes.',
    },
    {
      nombre: 'Ciencia ficción',
      descripcion: 'Narrativas futuristas, distopías y mundos alternativos.',
    },
    {
      nombre: 'Historia',
      descripcion: 'Libros sobre eventos históricos, biografías y análisis sociales.',
    },
    {
      nombre: 'Arte y diseño',
      descripcion: 'Referencias visuales, teoría del color y diseño gráfico.',
    },
    {
      nombre: 'Drama',
      descripcion: 'Relatos intensos sobre conflictos humanos, emociones y dilemas personales.',
    },
    {
      nombre: 'Romance',
      descripcion: 'Historias centradas en relaciones amorosas y vínculos afectivos.',
    },
    {
      nombre: 'Misterio',
      descripcion: 'Tramas con enigmas, investigaciones y giros inesperados.',
    },
    {
      nombre: 'Fantasía',
      descripcion: 'Mundos mágicos, criaturas míticas y aventuras épicas.',
    },
    {
      nombre: 'Psicología',
      descripcion: 'Libros sobre comportamiento humano, emociones y procesos mentales.',
    },
  ]);
  console.log('Categorías insertadas correctamente');
}