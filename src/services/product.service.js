import { BadRequestError } from '../core/error.res.js';
import productRepo from '../models/repositories/product.repo.js';
import {
  getSelectData,
  splitQueryString,
  getSelectDataWithValue,
  unselectData,
} from '../utils/index.js';
import productConfig from './product.config.js';

//productService base on factory pattern
class ProductService {
  static productRegister = {};
  static addProductRegister(name, classRef) {
    ProductService.productRegister[name] = classRef;
  }
  static async createProduct(type, payload) {
    const productClass = ProductService.productRegister[type];
    if (!productClass) throw new BadRequestError(400, 'Not find class');
    return await new productClass(payload).createProduct();
  }

  static async getAllDraft({ limit = 50, page = 1 }) {
    const skip = (page - 1) * limit;
    return await productRepo.queryAllDraft({ limit, skip });
  }

  static async getAllProduct({
    limit = 50,
    page = 1,
    select = '',
    sort = 'ctime',
    filter = '',
  }) {
    const skip = (page - 1) * limit;
    return await productRepo.queryAllPublished({
      limit,
      skip,
      sort,
      filter: getSelectDataWithValue([
        ...splitQueryString(filter),
        'isPublished:true',
      ]),
      select: getSelectData([
        ...splitQueryString(select),
        'product_name',
        'product_thumb',
        'product_price',
        'product_rating',
      ]),
    });
  }

  static async publishOneProduct({ productId }) {
    return await productRepo.publishOnePorduct(productId);
  }

  static async unpublishOneProduct({ productId }) {
    return await productRepo.unpublishOneProduct(productId);
  }

  static async search(keyword) {
    return await productRepo.searchProduct(keyword);
  }

  static async getOneProduct({ productId, unselect }) {
    return await productRepo.getOneProduct({
      productId,
      unselect: unselectData([...splitQueryString(unselect), '__v']),
    });
  }

  static async updateProduct({ productId, payload, type }) {
    const productClass = ProductService.productRegister[type];
    if (!productClass) throw new BadRequestError(400, 'Not find class');
    return await new productClass(payload).updateProduct(productId);
  }
}

//add register
// console.log(productConfig);
for (let product in productConfig) {
  ProductService.addProductRegister(product, productConfig[product]);
}

export default ProductService;
