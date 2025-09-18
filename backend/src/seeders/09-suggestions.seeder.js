// src/seeders/07-suggestions.seeder.js
import { Suggestion } from '../models/index.js';
import { SUGGESTION_TYPES } from '../config/constants.js';

export async function seedSugerencias() {
  await Suggestion.bulkCreate([
    // Luis (id_usuario: 2)
    {
      id_usuario: 2,
      tipo: SUGGESTION_TYPES.LIBRO_RECOMENDADO,
      detalles: 'Sería genial incluir “Refactoring” de Martin Fowler en la colección.'
    },
    {
      id_usuario: 2,
      tipo: SUGGESTION_TYPES.MEJORA_VISUAL,
      detalles: 'El contraste de los botones en modo oscuro podría mejorarse para accesibilidad.'
    },
    {
      id_usuario: 2,
      tipo: SUGGESTION_TYPES.FUNCIONALIDAD_NUEVA,
      detalles: '¿Podrían agregar una opción para marcar libros como favoritos?'

    },

    // María (id_usuario: 3)
    {
      id_usuario: 3,
      tipo: SUGGESTION_TYPES.EXPERIENCIA_USUARIO,
      detalles: 'La navegación entre secciones es un poco confusa en dispositivos móviles.'
    },
    {
      id_usuario: 3,
      tipo: SUGGESTION_TYPES.ERROR_EN_CONTENIDO,
      detalles: 'En la ficha de “Dune” aparece mal el número de páginas.'
    },
    {
      id_usuario: 3,
      tipo: SUGGESTION_TYPES.GESTION_BIBLIOTECA,
      detalles: 'Sería útil mostrar qué ejemplares están prestados antes de intentar reservar.'

    },

    // Jorge (id_usuario: 4)
    {
      id_usuario: 4,
      tipo: SUGGESTION_TYPES.LIBRO_RECOMENDADO,
      detalles: 'Sugiero agregar “La sociedad del cansancio” de Byung-Chul Han.'
    },
    {
      id_usuario: 4,
      tipo: SUGGESTION_TYPES.FUNCIONALIDAD_NUEVA,
      detalles: '¿Es posible implementar una sección de libros recomendados por el bibliotecario?'
    },
    {
      id_usuario: 4,
      tipo: SUGGESTION_TYPES.MEJORA_VISUAL,
      detalles: 'Las miniaturas de portada se ven pixeladas en pantallas grandes.'
    }
  ]);
  console.log('Sugerencias insertadas correctamente');
}