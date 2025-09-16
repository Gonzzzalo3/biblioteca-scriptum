// src/utils/initDb.js

//Este archivo solo sirve para que el sistema verifique si la base de datos existe, si no la creará automáticamente
import mysql from "mysql2/promise";
import { config } from "../config/env.js";

//Función que se encarga de crear la base de datos si no existe
export async function createDatabaseIfNotExists() {
    //se intenta realizarlo
    try {
        //Se crea una conexión con los párametros establecidos
        const connection = await mysql.createConnection({
        host: config.db.host, //host
        port: config.db.port, //puerto
        user: config.db.user, //usuario
        password: config.db.pass, //contraseña
        });

        //consulta que se realizará dentro de la conexión
        await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${config.db.name}\`;`
        );
        //mensaje de éxito
        console.log(`Base de datos "${config.db.name}" verificada o creada en ${config.db.host}:${config.db.port}`); 
        await connection.end(); //cerrando la conexión para no ocupar slots innecesarios

    //se captura el error en caso de que algo falle
    } catch (error){
        console.error('Error al verificar/crear la base de datos:', error.message); //mensaje de error
        process.exit(1); //detener el servidor si falla
    }
}
