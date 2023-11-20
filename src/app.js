import chalk from 'chalk';
import express from 'express';
import './dbs/init.db.js';
import { checkOverload, countConnet } from './helpers/check.connect.js'
import routes from './routers/index.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

countConnet();
checkOverload();

app.use('/', routes);


export default app;
