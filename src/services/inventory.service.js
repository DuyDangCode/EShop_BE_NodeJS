import inventoryRepo from '../models/repositories/inventory.repo.js'
class InventorySevice {
  static async getOneInventory(inventoryId) {
    return await inventoryRepo.findOneInventory(inventoryId)
  }

  static async getInventories({ filter, page = 1, limit = 50, sort, select }) {
    const skip = (page - 1) * limit
    return await inventoryRepo.findAllInventories({
      filter,
      limit,
      skip,
      sort,
      select,
    })
  }

  /**
   * userId
   * inventories: [
   *  {
   *    inven_productId,
   *    inven_stock
   *  }
   *
   * ]
   */
  static async import() {}

  static async export() {}
}

export default InventorySevice
