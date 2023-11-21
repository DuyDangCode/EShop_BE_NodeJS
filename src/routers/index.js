import express from 'express';
import accessRouter from './access/index.js';

const routers = express.Router();

routers.use('/v1/api', accessRouter);

export default routers;
