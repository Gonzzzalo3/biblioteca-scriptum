// src/server.js
import app from "./app.js"; //importa la aplicación configurada

//importa funciones de otras carpetas para comenzar a ejecutarlas junto al arranque del servidor
import { createDatabaseIfNotExists } from "./utils/initDb.js";
import { testDbConnection, sequelize } from "./config/db.js";
import { config } from "./config/env.js";

//modelos
import { User } from "./models/User.js";
import { Category } from "./models/Category.js";
import { Book } from "./models/Book.js";
import { Comment } from "./models/Comment.js";
import { Exemplary } from "./models/Exemplary.js";
import { Recommendation } from "./models/Recommendation.js"
import { Reservation } from "./models/Reservation.js"
import { ReservationEvent } from "./models/ReservationEvent.js";
import { Suggestion } from "./models/Suggestion.js";

//función flecha que comienza a iniciar secuencialmente todas las funciones necesarias para el arranque del servidor
(async () => {
    await createDatabaseIfNotExists(); //crea la base de datos si no existe
    await testDbConnection(); //prueba la conexión
    await sequelize.sync(); //carga los modelos a la base de datos

    //inicio del servidor
    app.listen(config.server.port, () => {
        console.log(
        `🚀 Servidor escuchando en http://localhost:${config.server.port}`
        );
    });
})();
