import express from 'express'
import accessRouter from './access/index.js'
import productRouter from './product/index.js'
import voucherRouter from './voucher/index.js'
import { BASE_URL_V1 } from '../constrant/system.constrant.js'

const routers = express.Router()

routers.use(`${BASE_URL_V1}/users`, accessRouter)
routers.use(`${BASE_URL_V1}/products`, productRouter)
routers.use(`${BASE_URL_V1}/vouchers`, voucherRouter)

export default routers
