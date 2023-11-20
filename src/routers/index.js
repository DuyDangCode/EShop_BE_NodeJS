import express from 'express';
import accessRouter from './access/index.js';



const routes = express.Router();


routes.use('/v1/api/', accessRouter);


export default routes;


