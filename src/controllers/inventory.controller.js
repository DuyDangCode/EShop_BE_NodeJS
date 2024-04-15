import { OK } from '../core/success.res.js'
import InventorySevice from '../services/inventory.service.js'

class InventoryController {
  static async getInventory(req, res) {
    return new OK({
      message: 'Get inventory successfully',
      metadata: await InventorySevice.getOneInventory(req.params.invenId)
    }).send(res)
  }

  static async getInventories(req, res) {
    return new OK({
      message: 'Get all inventory successfully',
      metadata: await InventorySevice.getInventories(req.query)
    }).send(res)
  }
}

export default InventoryController
