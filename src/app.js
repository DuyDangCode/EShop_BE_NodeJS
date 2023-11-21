import chalk from 'chalk';
import express from 'express';
import './dbs/init.db.js';
import { checkOverload, countConnet } from './helpers/check.connect.js'
import routers from './routers/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

countConnet();
checkOverload();

app.use('/', routers);

//handle error
//404 
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})


app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message: error.message || 'Internal server error',
  })
})


export default app;
