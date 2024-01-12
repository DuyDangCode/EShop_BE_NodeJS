import { BadRequestError } from '../core/error.res.js';
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
}

//add register
// console.log(productConfig);
for (let product in productConfig) {
  ProductService.addProductRegister(product, productConfig[product]);
}

export default ProductService;
