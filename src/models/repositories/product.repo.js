import { BadRequestError } from '../../core/error.res.js'
import { convertStringToObjectId } from '../../utils/index.js'
import productModel from '../product.model.js'
import products from '../product.model.js'
import { Types } from 'mongoose'

const queryProducts = async ({
  filter,
  limit = 50,
  skip = 1,
  sort = { update: -1 },
  select,
}) => {
  return await products.productModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
}

const queryAllDraft = async ({ limit = 50, skip = 1 }) => {
  const filter = { isDraft: true }
  return await queryProducts({ filter, limit, skip })
}

const queryAllPublished = async ({
  filter,
  limit = 50,
  skip = 1,
  select,
  sort,
}) => {
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  return await queryProducts({ filter, limit, skip, select, sort: sortBy })
}

const queryAll = ({ filter, limit = 50, skip = 1, select, sort }) => {
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 }
  return queryProducts({ filter, limit, skip, select, sort: sortBy })
}

const getOneProduct = async ({ productId, unselect }) => {
  return await products.productModel
    .findById(convertStringToObjectId(productId))
    .select(unselect)
    .lean()
}
const getOnePublisedProduct = async ({ productId, unselect }) => {
  return await products.productModel
    .findone({
      _id: convertStringToObjectId(productId),
      isPublished: true,
      isDraft: false,
    })
    .select(unselect)
    .lean()
}
const getOnePublisedProductBySlug = async ({ product_slug, unselect }) => {
  return await products.productModel
    .findOne({
      product_slug,
      isPublished: true,
      isDraft: false,
    })
    .select(unselect)
    .lean()
}

const unpublishOneProduct = async (productId) => {
  const holderProduct = await products.productModel.findOne({
    _id: new Types.ObjectId(productId),
    isPublished: true,
    isDraft: false,
  })
  if (!holderProduct) throw new BadRequestError(403, 'product not found')
  holderProduct.isDraft = true
  holderProduct.isPublished = false
  return await holderProduct.updateOne(holderProduct)
}

const publishOnePorduct = async (productId) => {
  const holderProduct = await products.productModel.findOne({
    _id: new Types.ObjectId(productId),
    isDraft: true,
    isPublished: false,
  })
  if (!holderProduct) throw new BadRequestError(403, 'product not found')
  holderProduct.isDraft = false
  holderProduct.isPublished = true
  return await holderProduct.updateOne(holderProduct)
}

const searchProduct = async (keySearch) => {
  const regexSearch = new RegExp(keySearch)
  const results = await products.productModel
    .find(
      { $text: { $search: regexSearch } },
      { score: { $meta: 'textScore' } },
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean()
  return results
}

const updateProductById = async ({
  productId,
  payload,
  model,
  isNew = true,
}) => {
  return await model.findByIdAndUpdate(productId, payload, { new: isNew })
}

const updateProductQuantityById = async (productId, product_quantity) => {
  return await products.productModel.updateOne(
    {
      _id: convertStringToObjectId(productId),
    },
    { $set: { product_quantity } },
  )
}

const findProductByName = async (product_name) => {
  return await products
    .productModel(
      { product_name },
      { _id: 1, product_name: 1, product_quantity: 1, product_price: 1 },
    )
    .lean()
}

const checkProduct = async (product) => {
  const existingProduct = await products.productModel.findOne({
    _id: convertStringToObjectId(product.productId),
    product_quantity: { $gte: product.productQuantity },
    isPublished: true,
    isDraft: false,
  })
  return existingProduct
}

const findProductByIdPublish = async (product) => {
  return await products.productModel
    .findOne({
      _id: convertStringToObjectId(product.productId),
      isPublished: true,
      isDraft: false,
    })
    .lean()
}

const findProductByIdPricePublish = async (product) => {
  return await products.productModel
    .findOne({
      _id: convertStringToObjectId(product.productId),
      product_price: product.product_price,
      isPublished: true,
      isDraft: false,
    })
    .lean()
}

const checkProductIds = async (products) => {
  return await Promise.all(
    products.map(
      (product) =>
        new Promise(async (resolve, reject) => {
          const foundProduct = await findProductByIdPublish(product)
          foundProduct ? resolve(foundProduct) : reject()
        }),
    ),
  )
    .then((res) => res)
    .catch(() => false)
}

const getPublishedProductByCatergory = async (
  product_type,
  limit,
  skip,
  select,
) => {
  return await products.productModel
    .find({ product_type, isPublished: true, isDraft: false })
    .limit(limit)
    .skip(skip)
    .select(select)
    .lean()
}

const getTotalPublishedProduct = async (product_type) => {
  // product_type, isDraft: false, isPublished: true
  const result = await products.productModel.aggregate([
    { $match: { product_type, isDraft: false, isPublished: true } },
    {
      $count: 'total',
    },
  ])
  return result.length > 0 ? result?.[0] : { total: 0 }
}

export default {
  findProductByIdPricePublish,
  findProductByIdPublish,
  checkProductIds,
  queryAllDraft,
  queryAllPublished,
  publishOnePorduct,
  unpublishOneProduct,
  searchProduct,
  getOneProduct,
  updateProductById,
  findProductByName,
  checkProduct,
  queryAll,
  getPublishedProductByCatergory,
  updateProductQuantityById,
  getTotalPublishedProduct,
  getOnePublisedProduct,
  getOnePublisedProductBySlug,
}
