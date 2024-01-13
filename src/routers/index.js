import express from 'express';
import accessRouter from './access/index.js';
import productRouter from './product/index.js';

const routers = express.Router();

routers.use('/v1/api/users', accessRouter);
routers.use('/v1/api/products', productRouter);

export default routers;
