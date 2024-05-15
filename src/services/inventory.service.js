import inventoryRepo from '../models/repositories/inventory.repo.js'
import productRepo from '../models/repositories/product.repo.js'
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
  static async import(userId, inven_productId, inven_stock) {
    if (userId && inven_productId && inven_stock)
      throw new BadRequestError('Something is missing')
    const resultUpdateInven = await inventoryRepo.importInventory(
      userId,
      inven_productId,
      inven_stock,
    )
    if (resultUpdateInven) {
      productRepo.updateProductQuantityById(
        inven_productId,
        resultUpdateInven.inven_stock,
      )
    }
    return resultUpdateInven
  }

  static async export(userId, inven_productId, inven_stock) {
    if (userId && inven_productId && inven_stock)
      throw new BadRequestError('Something is missing')
    const resultUpdateInven = await inventoryRepo.exportInventory(
      userId,
      inven_productId,
      inven_stock,
    )
    if (resultUpdateInven) {
      productRepo.updateProductQuantityById(
        inven_productId,
        resultUpdateInven.inven_stock,
      )
    }
    return resultUpdateInven
  }
}

export default InventorySevice
