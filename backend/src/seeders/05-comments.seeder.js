// src/seeders/05-comments.seeder.js
import { Comment } from '../models/index.js';

export async function seedComentarios() {
  await Comment.bulkCreate([
    {
      id_usuario: 2,
      id_libro: 1,
      contenido: 'Este libro me ayudó a mejorar mi código desde el primer capítulo.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 3,
      id_libro: 1,
      contenido: 'Muy técnico, pero bien explicado. Ideal para desarrolladores intermedios.',
      calificacion: 4,
      visible: true
    },
    {
      id_usuario: 4,
      id_libro: 2,
      contenido: 'Me gustó el enfoque práctico, aunque esperaba más ejemplos.',
      calificacion: 3,
      visible: true
    },
    {
      id_usuario: 2,
      id_libro: 4,
      contenido: 'Una obra maestra de la ciencia ficción. El mundo de Dune es fascinante.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 3,
      id_libro: 5,
      contenido: 'Lectura obligatoria para entender la evolución humana.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 4,
      id_libro: 6,
      contenido: 'Muy útil para entender cómo el diseño afecta la experiencia del usuario.',
      calificacion: 4,
      visible: true
    },
    {
      id_usuario: 2,
      id_libro: 7,
      contenido: 'Una historia conmovedora. Zezé se queda en el corazón.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 3,
      id_libro: 9,
      contenido: 'Intrigante y complejo. Eco sabe cómo construir misterio.',
      calificacion: 4,
      visible: true
    },
    {
      id_usuario: 4,
      id_libro: 10,
      contenido: 'Una saga épica que nunca envejece. Tolkien es inmortal.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 2,
      id_libro: 13,
      contenido: 'Una obra profunda, llena de simbolismo y belleza narrativa.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 3,
      id_libro: 15,
      contenido: 'Un clásico del ciberpunk. Me hizo pensar en el futuro digital.',
      calificacion: 4,
      visible: true
    },
    {
      id_usuario: 4,
      id_libro: 17,
      contenido: 'Una historia de amor que te rompe y te reconstruye.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 2,
      id_libro: 20,
      contenido: 'Asimov nunca decepciona. Fundación es una joya.',
      calificacion: 5,
      visible: true
    },
    {
      id_usuario: 3,
      id_libro: 22,
      contenido: 'Ideas simples pero poderosas. Muy inspirador.',
      calificacion: 4,
      visible: true
    },
    {
      id_usuario: 4,
      id_libro: 25,
      contenido: 'Una historia intensa, con una atmósfera muy bien lograda.',
      calificacion: 4,
      visible: true
    }
  ]);
  console.log('Comentarios insertados correctamente');
}