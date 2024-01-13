import { BadRequestError } from '../core/error.res.js';
import productRepo from '../models/repositories/product.repo.js';
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

  static async getAllDraft({ limit = 50, skip = 1 }) {
    return await productRepo.queryAllDraft({ limit, skip });
  }

  static async getAllPublished({ limit = 50, skip = 1 }) {
    return await productRepo.queryAllPublished({ limit, skip });
  }
}

//add register
// console.log(productConfig);
for (let product in productConfig) {
  ProductService.addProductRegister(product, productConfig[product]);
}

export default ProductService;
