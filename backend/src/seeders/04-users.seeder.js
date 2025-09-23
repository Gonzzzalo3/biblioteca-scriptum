// src/seeders/04-users.seeder.js
import { User } from "../models/index.js";
import { ROLES, USER_STATUS } from "../config/constants.js";
import { sequelize } from "../config/db.js";

export async function seedUsuarios() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.query("TRUNCATE TABLE Users");
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

  await User.bulkCreate(
    [
      {
        nombres: "Ana",
        apellidos: "González",
        correo: "ana.biblio@demo.com",
        celular: "987654321",
        contraseña: "admin123",
        rol: ROLES.BIBLIOTECARIO,
        estado: USER_STATUS.ACTIVO,
        is_verified: true,
        img: "/img/usuarios/anagonzales.jpg",
      },
      {
        nombres: "Ariel Bryand",
        apellidos: "Astete Vargas",
        correo: "ariel.astete@demo.com",
        celular: "912345678",
        contraseña: "cliente123",
        rol: ROLES.CLIENTE,
        estado: USER_STATUS.ACTIVO,
        is_verified: true,
        img: "/img/usuarios/arielastete.jpg",
      },
      {
        nombres: "María",
        apellidos: "Torres",
        correo: "maria.cliente@demo.com",
        celular: "923456789",
        contraseña: "cliente123",
        rol: ROLES.CLIENTE,
        estado: USER_STATUS.ACTIVO,
        is_verified: true,
        img: "/img/usuarios/mariatorres.jpg",
      },
      {
        nombres: "Diego Alexander",
        apellidos: "Veliz Salinas",
        correo: "diego.veliz@demo.com",
        celular: "934567890",
        contraseña: "cliente123",
        rol: ROLES.CLIENTE,
        estado: USER_STATUS.ACTIVO,
        is_verified: true,
        img: "/img/usuarios/diegoveliz.jpg",
      },
    ],
    {
      individualHooks: true,
    }
  );
  console.log("Usuarios insertados correctamente");
}
