import chalk from 'chalk';
import express from 'express';
import './dbs/init.db.js';
import { checkOverload, countConnet } from './helpers/check.connect.js';
import routers from './routers/index.js';
import * as dotenv from 'dotenv';
import Database from './dbs/init.db.js';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();
Database.getInstance();

const app = express();

// middleware

// countConnet();
// checkOverload();

app.use(morgan('dev'));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', routers);

//handle error
//404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log(`E-Shop:::Error::: ${error.message}`);
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal server error',
  });
});

export default app;
