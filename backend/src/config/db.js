// src/config/db.js

/*En esta archivo se configura con Sequelize la base de datos, asignándole 
de valores las variables de entorno como parámetros*/

import { Sequelize } from "sequelize"; //módulo de sequelize
import { config } from "./env.js"; //importando el objeto config de /env.js

/*creando una nueva instancia de objeto de Sequelize y se le asigna los valores para poder 
realizar una conexión a la base de datos*/

export const sequelize = new Sequelize(
  config.db.name, //nombre de la bd
  config.db.user, //usuario de la bd
  config.db.pass, //contraseña de la bd
  {
    host: config.db.host, //nombre del host de la bd
    port: config.db.port, //puerto donde está la bd
    dialect: "mysql", //identificar que se está trabajando con mysql
    logging: config.server.env === "development" ? console.log : false, //si el entorno está definido como desarrollo entonces mostrará por la consola las consultas SQL que sequelize haga

    //configuraciones adicionales
    define: {
      freezeTableName: true, // evita que Sequelize pluralice nombres de tablas
      timestamps: true, // activa automáticamente createdAt y updatedAt
      underscored: true, // usa snake_case en vez de camelCase en columnas
    },

    pool: {
      max: 10, // número máximo de conexiones simultáneas abiertas hacia la base de datos
      min: 0, // número mínimo de conexiones que se mantienen abiertas (puede ser 0 si no hay actividad)
      acquire: 30000, // tiempo máximo (en ms) que Sequelize esperará para obtener una conexión antes de lanzar error
      idle: 10000, // tiempo (en ms) que una conexión puede estar inactiva antes de ser cerrada automáticamente
    },

    dialectOptions: {
      charset: "utf8", // define el conjunto de caracteres permitido; utf8 excluye emojis y caracteres extendidos
      collate: "utf8_general_ci", // define cómo se comparan y ordenan los textos; 'ci' significa case-insensitive
      connectTimeout: 10000, // tiempo máximo (en ms) para establecer la conexión inicial con la base de datos
    },
  }
);

//Función que autentica la conexión a la base de datos, en caso no logre conectar soltará un error
export async function testDbConnection() {

    //intenta conectar
    try {
        await sequelize.authenticate(); //Se trata de establecer una conexión con la base de datos
        console.log("Conexión a la base de datos exitosa."); //mensaje de éxito

    //en caso de error lo captura y lo imprime
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message); //mensaje de error
        process.exit(1); //En caso de error apaga el servidor
    }
}
