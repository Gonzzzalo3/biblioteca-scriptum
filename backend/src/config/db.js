// src/config/db.js
import { Sequelize } from 'sequelize';
import { config } from './env.js';


export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    logging: config.server.env === 'development' ? console.log : false,
  }
);
