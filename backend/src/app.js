// src/app.js

//En este archivo se configura toda la aplicación y la prepara para arrancar en server.js
import express from 'express'; //framework de express

const app = express(); //crea una nueva instancia de express en app
app.use(express.json()); //Middleware para que express pueda manejar archivo .json

export default app; //exporta toda la aplicación con su configuración