// src/seeders/04-users.seeder.js
import { User } from '../models/index.js';
import { ROLES, USER_STATUS } from '../config/constants.js';

export async function seedUsuarios() {
  await User.bulkCreate([
    {
      nombres: 'Ana',
      apellidos: 'González',
      correo: 'ana.biblio@demo.com',
      celular: '987654321',
      contraseña: 'admin123',
      rol: ROLES.BIBLIOTECARIO,
      estado: USER_STATUS.ACTIVO,
      is_verified: true
    },
    {
      nombres: 'Luis',
      apellidos: 'Ramírez',
      correo: 'luis.cliente@demo.com',
      celular: '912345678',
      contraseña: 'cliente123',
      rol: ROLES.CLIENTE,
      estado: USER_STATUS.ACTIVO,
      is_verified: true
    },
    {
      nombres: 'María',
      apellidos: 'Torres',
      correo: 'maria.cliente@demo.com',
      celular: '923456789',
      contraseña: 'cliente123',
      rol: ROLES.CLIENTE,
      estado: USER_STATUS.ACTIVO,
      is_verified: true
    },
    {
      nombres: 'Jorge',
      apellidos: 'Fernández',
      correo: 'jorge.cliente@demo.com',
      celular: '934567890',
      contraseña: 'cliente123',
      rol: ROLES.CLIENTE,
      estado: USER_STATUS.ACTIVO,
      is_verified: true
    }
  ]);
  console.log('Usuarios insertados correctamente');
}