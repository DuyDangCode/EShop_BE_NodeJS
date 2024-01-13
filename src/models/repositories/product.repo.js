import products from '../product.model.js';

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

export default {
  queryAllDraft,
  queryAllPublished,
};
