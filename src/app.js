import chalk from 'chalk';
import express from 'express';
import './dbs/init.db.js';

const app = express();



app.get('/', (req, res, next) => {
  console.log(chalk.yellow('E-Shop: Say hello'));
  return 'hello';
});

export default app;
