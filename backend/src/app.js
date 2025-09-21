// src/app.js

//En este archivo se configura toda la aplicación y la prepara para arrancar en server.js
import express from 'express'; //framework de express
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import cors from "cors";
import { config } from './config/env.js';

const app = express(); //crea una nueva instancia de express en app

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

app.use(express.json()); //Middleware para que express pueda manejar archivo .json
app.use(cookieParser());
app.use('/api', routes);



export default app; //exporta toda la aplicación con su configuración