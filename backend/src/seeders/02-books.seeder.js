// src/seeders/02-books.seeder.js
import { Book } from '../models/index.js';

export async function seedLibros() {
  await Book.bulkCreate([
    {
      id_categoria: 1,
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      sinopsis: 'Principios y buenas prácticas para escribir código limpio y mantenible.',
      portada: '/img/libros/cleancode.jpg',
      isbn: '9780132350884',
      stock: 5
    },
    {
      id_categoria: 1,
      titulo: 'The Pragmatic Programmer',
      autor: 'Andrew Hunt y David Thomas',
      sinopsis: 'Consejos prácticos para desarrolladores que buscan mejorar su enfoque profesional.',
      portada: '/img/libros/pragmatic.jpg',
      isbn: '9780201616224',
      stock: 4
    },
    {
      id_categoria: 2,
      titulo: 'Pedagogía del oprimido',
      autor: 'Paulo Freire',
      sinopsis: 'Obra fundamental sobre educación crítica y liberadora.',
      portada: '/img/libros/pedagdeloprim.jpg',
      isbn: '9788429303284',
      stock: 3
    },
    {
      id_categoria: 3,
      titulo: 'Dune',
      autor: 'Frank Herbert',
      sinopsis: 'Saga épica de ciencia ficción sobre poder, ecología y destino.',
      portada: '/img/libros/dune.jpg',
      isbn: '9780441172719',
      stock: 6
    },
    {
      id_categoria: 4,
      titulo: 'Sapiens: De animales a dioses',
      autor: 'Yuval Noah Harari',
      sinopsis: 'Historia de la humanidad desde una perspectiva evolutiva y cultural.',
      portada: '/img/libros/sapiens.jpg',
      isbn: '9788499924218',
      stock: 5
    },
    {
      id_categoria: 5,
      titulo: 'El diseño de todos los días',
      autor: 'Don Norman',
      sinopsis: 'Cómo el diseño influye en la experiencia cotidiana de los usuarios.',
      portada: '/img/libros/eldiseñodetodoslosdias.jpg',
      isbn: '9780465050659',
      stock: 2
    },
    {
      id_categoria: 6,
      titulo: 'Mi planta de naranja lima',
      autor: 'José Mauro de Vasconcelos',
      sinopsis: 'Historia conmovedora de Zezé, un niño sensible en un entorno difícil.',
      portada: '/img/libros/miplantanaranja.jpg',
      isbn: '9786070706432',
      stock: 4
    },
    {
      id_categoria: 7,
      titulo: 'Orgullo y prejuicio',
      autor: 'Jane Austen',
      sinopsis: 'Clásico del romance que explora el amor, el orgullo y la clase social.',
      portada: '/img/libros/orgulloyprejuicio.jpg',
      isbn: '9788491050298',
      stock: 5
    },
    {
      id_categoria: 8,
      titulo: 'El nombre de la rosa',
      autor: 'Umberto Eco',
      sinopsis: 'Misterio medieval en una abadía, con tintes filosóficos y detectivescos.',
      portada: '/img/libros/elnombredelarosa.jpg',
      isbn: '9788497593798',
      stock: 3
    },
    {
      id_categoria: 9,
      titulo: 'El señor de los anillos',
      autor: 'J.R.R. Tolkien',
      sinopsis: 'Trilogía épica de fantasía sobre la lucha entre el bien y el mal.',
      portada: '/img/libros/elsrdelosanillos.jpg',
      isbn: '9788445071413',
      stock: 7
    },
    {
      id_categoria: 10,
      titulo: 'Los hombres me explican cosas',
      autor: 'Rebecca Solnit',
      sinopsis: 'Ensayos sobre feminismo, poder y la invisibilización de las mujeres.',
      portada: '/img/libros/loshombresmeexplicancosas.jpg',
      isbn: '9788494424270',
      stock: 2
    },
    {
      id_categoria: 10,
      titulo: 'El hombre en busca de sentido',
      autor: 'Viktor Frankl',
      sinopsis: 'Reflexión psicológica desde la experiencia en campos de concentración.',
      portada: '/img/libros/elhombreenbuscadelsentido.jpg',
      isbn: '9788425422217',
      stock: 4
    },
    {
      id_categoria: 6,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      sinopsis: 'Saga familiar de los Buendía en Macondo, con realismo mágico y drama profundo.',
      portada: '/img/libros/100soledad.jpg',
      isbn: '9780307474728',
      stock: 6
    },
    {
      id_categoria: 3,
      titulo: 'Neuromante',
      autor: 'William Gibson',
      sinopsis: 'Ciberpunk clásico que define el género y anticipa el internet.',
      portada: '/img/libros/neuromante.jpg',
      isbn: '9788498727941',
      stock: 3
    },
    {
      id_categoria: 8,
      titulo: 'La chica del tren',
      autor: 'Paula Hawkins',
      sinopsis: 'Thriller psicológico sobre una mujer que presencia algo extraño desde el tren.',
      portada: '/img/libros/chicadeltren.jpg',
      isbn: '9788490628048',
      stock: 5
    },
    {
      id_categoria: 7,
      titulo: 'Bajo la misma estrella',
      autor: 'John Green',
      sinopsis: 'Historia de amor entre dos adolescentes con enfermedades terminales.',
      portada: '/img/libros/bajolamismaestrella.jpg',
      isbn: '9786073124165',
      stock: 4
    },
    {
      id_categoria: 2,
      titulo: 'La educación prohibida',
      autor: 'Germán Doin',
      sinopsis: 'Crítica al sistema educativo tradicional y propuestas alternativas.',
      portada: '/img/libros/educacionprohibida.jpg',
      isbn: '9789871234567',
      stock: 2
    },
    {
      id_categoria: 1,
      titulo: 'Código limpio para JavaScript',
      autor: 'Diego de Granda',
      sinopsis: 'Buenas prácticas y patrones para escribir JavaScript profesional y mantenible.',
      portada: '/img/libros/jslimpio.jpg',
      isbn: '9789876543210',
      stock: 4
    },
    {
      id_categoria: 2,
      titulo: 'La mente bien ordenada',
      autor: 'Edgar Morin',
      sinopsis: 'Propuesta para una reforma del pensamiento y la educación en el siglo XXI.',
      portada: '/img/libros/mentebienordenada.jpg',
      isbn: '9788432315802',
      stock: 3
    },
    {
      id_categoria: 3,
      titulo: 'Fundación',
      autor: 'Isaac Asimov',
      sinopsis: 'Saga clásica de ciencia ficción sobre el colapso de un imperio galáctico.',
      portada: '/img/libros/fundacion.jpg',
      isbn: '9788497593799',
      stock: 5
    },
    {
      id_categoria: 4,
      titulo: 'Breve historia del tiempo',
      autor: 'Stephen Hawking',
      sinopsis: 'Exploración accesible del universo, el tiempo y los agujeros negros.',
      portada: '/img/libros/brevehistoriadeltiempo.jpg',
      isbn: '9780553176988',
      stock: 4
    },
    {
      id_categoria: 5,
      titulo: 'Steal Like an Artist',
      autor: 'Austin Kleon',
      sinopsis: '10 ideas para desbloquear tu creatividad y aprender a inspirarte sin copiar.',
      portada: '/img/libros/steallikeanArtist.jpg',
      isbn: '9780761169253',
      stock: 2
    },
    {
      id_categoria: 6,
      titulo: 'El túnel',
      autor: 'Ernesto Sabato',
      sinopsis: 'Novela psicológica sobre obsesión, soledad y percepción distorsionada.',
      portada: '/img/libros/eltunel.jpg',
      isbn: '9789875661234',
      stock: 3
    },
    {
      id_categoria: 7,
      titulo: 'Como agua para chocolate',
      autor: 'Laura Esquivel',
      sinopsis: 'Historia de amor y cocina ambientada en la Revolución Mexicana.',
      portada: '/img/libros/aguaparachocolate.jpg',
      isbn: '9786070706433',
      stock: 5
    },
    {
      id_categoria: 8,
      titulo: 'El silencio de los corderos',
      autor: 'Thomas Harris',
      sinopsis: 'Thriller psicológico con el icónico personaje Hannibal Lecter.',
      portada: '/img/libros/silenciodecorderos.jpg',
      isbn: '9788497593797',
      stock: 4
    },
    {
      id_categoria: 9,
      titulo: 'Harry Potter y la piedra filosofal',
      autor: 'J.K. Rowling',
      sinopsis: 'Inicio de la saga mágica que marcó a una generación.',
      portada: '/img/libros/hp1.jpg',
      isbn: '9788478884452',
      stock: 6
    },
    {
      id_categoria: 10,
      titulo: 'Inteligencia emocional',
      autor: 'Daniel Goleman',
      sinopsis: 'Cómo las emociones influyen en el éxito personal y profesional.',
      portada: '/img/libros/inteligenciaemocional.jpg',
      isbn: '9788499086357',
      stock: 3
    }
  ], {
    individualHooks: true
  });
  console.log('Libros insertados correctamente');
}