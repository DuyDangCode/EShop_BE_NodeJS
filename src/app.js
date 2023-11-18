import chalk from 'chalk';
import express from 'express';
import './dbs/init.db.js';
import { checkOverload, countConnet } from './helpers/check.connect.js'

const app = express();

countConnet();
checkOverload();

app.get('/', (req, res, next) => {
  console.log(chalk.yellow('E-Shop: Say hello'));
  return 'hello';
});

export default app;
