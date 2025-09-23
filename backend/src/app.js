import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import cors from "cors";
import { config } from './config/env.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Servir carpeta public
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes);

export default app;