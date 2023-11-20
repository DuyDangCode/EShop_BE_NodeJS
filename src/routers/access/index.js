import express from 'express';

const accessRouter = express.Router();


accessRouter.get('/user/signup', (req, res, next) => {
  console.log("Hello i am signup");
  return res.send('oke');
})

export default accessRouter;
