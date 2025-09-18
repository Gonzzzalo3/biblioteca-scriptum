// src/server.js
import app from "./app.js"; //importa la aplicación configurada

//importa funciones de otras carpetas para comenzar a ejecutarlas junto al arranque del servidor
import { createDatabaseIfNotExists } from "./utils/initDb.js";
import { testDbConnection, sequelize } from "./config/db.js";
import { config } from "./config/env.js";
import { isSystemEmpty } from "./utils/isSystemEmpty.js";
import { runAllSeeders } from "./seeders/runSeeders.js";

//modelos
import {
  User,
  Category,
  Book,
  Comment,
  Exemplary,
  Recommendation,
  Reservation,
  ReservationEvent,
  Suggestion,
} from "./models/index.js";

//función flecha que comienza a iniciar secuencialmente todas las funciones necesarias para el arranque del servidor
(async () => {
  await createDatabaseIfNotExists(); //crea la base de datos si no existe
  await testDbConnection(); //prueba la conexión
  await sequelize.sync(); //carga los modelos a la base de datos

  if (await isSystemEmpty()) {
    await runAllSeeders();
  }

  //inicio del servidor
  app.listen(config.server.port, () => {
    console.log(
      `Servidor escuchando en http://localhost:${config.server.port}`
    );
  });
})();
