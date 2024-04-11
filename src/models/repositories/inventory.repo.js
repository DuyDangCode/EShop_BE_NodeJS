import inventoryModel from '../inventory.model.js'
import { convertStringToObjectId } from '../../utils/index.js'

const createInventory = async ({
  inven_productId,
  inven_stock,
  inven_location = 'unknow'
}) => {
  return await inventoryModel.create({
    inven_productId,
    inven_stock,
    inven_location
  })
}

const reservationInventory = async (productId, product_quantity, cartId) => {
  const query = {
      inven_productId: convertStringToObjectId(productId),
      inven_stock: { $gte: product_quantity }
    },
    update = {
      $inc: { inven_stock: -product_quantity },
      $push: {
        inven_reservation: {
          cartId,
          product_quantity,
          createOn: new Date()
        }
      }
    },
    option = {
      new: true,
      fields: '_id'
    }

  return await inventoryModel.findOneAndUpdate(query, update, option)
}

const returnGoodsInventory = async (invenId, product_quantity, cartId) => {
  const query = {
      _id: convertStringToObjectId(invenId)
    },
    update = {
      $inc: { inven_stock: product_quantity },
      $push: {
        inven_return_goods: {
          cartId,
          product_quantity,
          createOn: new Date()
        }
      }
    },
    option = {
      new: true
    }

  return await inventoryModel.updateOne(query, update, option)
}

export default { createInventory, reservationInventory, returnGoodsInventory }
