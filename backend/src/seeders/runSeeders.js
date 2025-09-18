import { seedCategorias } from './01-categories.seeder.js';
import { seedLibros } from './02-books.seeder.js';
import { seedEjemplares } from './03-exemplaries.seeder.js';
import { seedUsuarios } from './04-users.seeder.js';
import { seedComentarios } from './05-comments.seeder.js';
import { seedRecomendaciones } from './06-recommendations.seeder.js';
import { seedSugerencias } from './09-suggestions.seeder.js';

export async function runAllSeeders() {
    await seedCategorias();
    await seedLibros();
    await seedEjemplares();
    await seedUsuarios();
    await seedComentarios();
    await seedRecomendaciones();
    await seedSugerencias();
    console.log('Todos los seeders ejecutados correctamente');
}