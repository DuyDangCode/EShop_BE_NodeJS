import { OK } from '../core/success.res.js'
import InventorySevice from '../services/inventory.service.js'

class InventoryController {
  static async getInventory(req, res) {
    return new OK({
      message: 'Get inventory successfully',
      metadata: await InventorySevice.getOneInventory(req.params.invenId),
    }).send(res)
  }

  static async getInventories(req, res) {
    return new OK({
      message: 'Get all inventory successfully',
      metadata: await InventorySevice.getInventories(req.query),
    }).send(res)
  }

  static async importInventory(req, res) {
    return new OK({
      message: 'Import inventory successfully',
      metadata: await InventorySevice.import(req.user._id, req.body),
    }).send(res)
  }

  static async exportInventory(req, res) {
    return new OK({
      message: 'Export inventory successfully',
      metadata: await InventorySevice.export(req.user._id, req.body),
    }).send(res)
  }
}

export default InventoryController
