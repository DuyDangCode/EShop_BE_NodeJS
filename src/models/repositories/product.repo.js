import { BadRequestError } from '../../core/error.res.js';
import products from '../product.model.js';
import { Types } from 'mongoose';

const queryProducts = async ({ query, limit = 50, skip = 1 }) => {
  return await products.productModel
    .find(query)
    .sort({ update: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

const queryAllDraft = async ({ limit = 50, skip = 1 }) => {
  const query = { isDraft: true };
  return await queryProducts({ query, limit, skip });
};

const queryAllPublished = async ({ limit = 50, skip = 1 }) => {
  const query = { isPublished: true };
  return await queryProducts({ query, limit, skip });
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

const searchProduct = async ({ keySearch }) => {
  const regexSearch = new RegExp(keySearch);
  return await products.productModel
    .find(
      { $text: { $search: regexSearch } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .lean();
};

export default {
  queryAllDraft,
  queryAllPublished,
  publishOnePorduct,
  unpublishOneProduct,
  searchProduct,
};
