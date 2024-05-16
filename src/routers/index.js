import express from 'express'
import accessRouter from './access/index.js'
import productRouter from './product/index.js'
import voucherRouter from './voucher/index.js'
import { BASE_URL_V1 } from '../constrant/system.constrant.js'
import cartRouter from './cart/index.js'
import orderRouter from './order/index.js'
import inventoryRouter from './inventory/index.js'
import commentRouter from './comment/index.js'

const routers = express.Router()

routers.use(`${BASE_URL_V1}/users`, accessRouter)
routers.use(`${BASE_URL_V1}/products`, productRouter)
routers.use(`${BASE_URL_V1}/vouchers`, voucherRouter)
routers.use(`${BASE_URL_V1}/carts`, cartRouter)
routers.use(`${BASE_URL_V1}/orders`, orderRouter)
routers.use(`${BASE_URL_V1}/inventories`, inventoryRouter)
routers.use(`${BASE_URL_V1}/comments`, commentRouter)

export default routers
