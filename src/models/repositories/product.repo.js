import { BadRequestError } from '../../core/error.res.js';
import products from '../product.model.js';
import { Types } from 'mongoose';

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
    .lean();
};

const queryAllDraft = async ({ limit = 50, skip = 1 }) => {
  const filter = { isDraft: true };
  return await queryProducts({ filter, limit, skip });
};

const queryAllPublished = async ({
  filter,
  limit = 50,
  skip = 1,
  select,
  sort,
}) => {
  const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
  return await queryProducts({ filter, limit, skip, select, sort: sortBy });
};

const getOneProduct = async ({ productId, unselect }) => {
  return await products.productModel
    .findById(productId)
    .select(unselect)
    .lean();
};

const unpublishOneProduct = async (productId) => {
  const holderProduct = await products.productModel.findOne({
    _id: new Types.ObjectId(productId),
    isPublished: true,
    isDraft: false,
  });
  if (!holderProduct) throw new BadRequestError(403, 'product not found');
  holderProduct.isDraft = true;
  holderProduct.isPublished = false;
  return await holderProduct.updateOne(holderProduct);
};

const publishOnePorduct = async (productId) => {
  const holderProduct = await products.productModel.findOne({
    _id: new Types.ObjectId(productId),
    isDraft: true,
    isPublished: false,
  });
  if (!holderProduct) throw new BadRequestError(403, 'product not found');
  holderProduct.isDraft = false;
  holderProduct.isPublished = true;
  return await holderProduct.updateOne(holderProduct);
};

const searchProduct = async (keySearch) => {
  const regexSearch = new RegExp(keySearch);
  const results = await products.productModel
    .find(
      { $text: { $search: regexSearch } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean();
  return results;
};

const updateProductById = async ({
  productId,
  payload,
  model,
  isNew = true,
}) => {
  return await model.findByIdAndUpdate(productId, payload, { new: isNew });
};

const findProductByName = async (product_name) => {
  return await products
    .productModel(
      { product_name },
      { _id: 1, product_name: 1, product_quantity: 1, product_price: 1 }
    )
    .lean();
};

export default {
  queryAllDraft,
  queryAllPublished,
  publishOnePorduct,
  unpublishOneProduct,
  searchProduct,
  getOneProduct,
  updateProductById,
  findProductByName,
};
