import inventoryModel from '../inventory.model.js'
import { convertStringToObjectId } from '../../utils/index.js'

const createInventory = async ({
  inven_productId,
  inven_stock,
  inven_location,
  inven_import,
}) => {
  return await inventoryModel.create({
    inven_productId,
    inven_stock,
    inven_location,
    inven_import,
  })
}

const reservationInventory = async (productId, product_quantity, cartId) => {
  const query = {
      inven_productId: convertStringToObjectId(productId),
      inven_stock: { $gte: product_quantity },
    },
    update = {
      $inc: { inven_stock: -product_quantity },
      $push: {
        inven_reservation: {
          cartId,
          product_quantity,
          createOn: new Date(),
        },
      },
    },
    option = {
      new: true,
      fields: '_id',
    }

  return await inventoryModel.findOneAndUpdate(query, update, option)
}

const returnGoodsInventory = async (invenId, product_quantity, cartId) => {
  const query = {
      _id: convertStringToObjectId(invenId),
    },
    update = {
      $inc: { inven_stock: product_quantity },
      $push: {
        inven_return_goods: {
          cartId,
          product_quantity,
          createOn: new Date(),
        },
      },
    },
    option = {
      new: true,
    }

  return await inventoryModel.updateOne(query, update, option)
}

const findOneInventory = async (inventoryId) => {
  return await inventoryModel.findById(convertStringToObjectId(inventoryId))
}

const findAllInventories = async ({
  filter = {},
  limit = 50,
  skip = 0,
  sort = { createdAt: -1 },
  select,
}) => {
  return await inventoryModel
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select(select)
    .lean()
}

const importInventory = async (userId, productId, quantity) => {
  return await inventoryModel.findOneAndUpdate(
    { inven_productId: convertStringToObjectId(productId) },
    {
      $inc: { inven_stock: quantity },
      $push: { inven_import: { userId, product_quantity: quantity } },
    },
    {
      new: true,
    },
  )
}
const exportInventory = async (userId, productId, quantity) => {
  return await inventoryModel.updateOne(
    { inven_productId: convertStringToObjectId(productId) },
    {
      $inc: { inven_stock: -quantity },
      $push: { inven_export: { userId, product_quantity: quantity } },
    },
    {
      new: true,
    },
  )
}

export default {
  createInventory,
  reservationInventory,
  returnGoodsInventory,
  findOneInventory,
  findAllInventories,
  importInventory,
  exportInventory,
}
