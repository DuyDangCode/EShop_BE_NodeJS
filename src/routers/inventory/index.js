import { checkRoleAdmin } from '../../auth/checkAuth.js'
import InventoryController from '../../controllers/inventory.controller.js'
import express from 'express'
import { asyncHandler } from '../../helpers/index.helper.js'

const inventoryRouter = express.Router()

inventoryRouter.use(checkRoleAdmin)
inventoryRouter.get('/all', asyncHandler(InventoryController.getInventories))
inventoryRouter.get('/:invenId', asyncHandler(InventoryController.getInventory))

export default inventoryRouter
