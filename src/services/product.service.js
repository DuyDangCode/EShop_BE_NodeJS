import { BadRequestError } from '../core/error.res';
import productConfig from '../configs/product.config';

//productService base on factory pattern
class ProductService {
  static productRegister = {};
  static addProductRegister(name, classRef) {
    ProductService.productRegister[name] = classRef;
  }
  static async createProduct(type, payload) {
    const productClass = ProductService.productRegister[type];
    if (!productClass) throw new BadRequestError('Not find class');
    return await new productClass(payload).createProduct();
  }
}

//add register
for (let { key, value } in productConfig) {
  ProductService.addProductRegister(key, value);
}

export default ProductService;
