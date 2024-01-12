import { BadRequestError } from '../core/error.res';
import { CREATED } from '../core/success.res';
import ProductService from '../services/product.service';
class ProductController {
  static async createProduct(req, res) {
    return new CREATED({
      message: 'Create product successful',
      metadata: await ProductService.createProduct(
        req.body.product_type,
        req.body
      ),
    }).send(res);
  }
}

export default ProductController;
