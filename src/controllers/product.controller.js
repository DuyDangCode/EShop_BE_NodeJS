import { BadRequestError } from '../core/error.res.js';
import { CREATED, OK } from '../core/success.res.js';
import ProductService from '../services/product.service.js';
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

  static async getAllDraft(req, res) {
    return new OK({
      message: 'Get all product successful',
      metadata: await ProductService.getAllDraft(req.query),
    }).send(res);
  }

  static async getAllPublished(req, res) {
    return new OK({
      message: 'Get all product successful',
      metadata: await ProductService.getAllPublished(req.query),
    }).send(res);
  }

  static async publishOneProduct(req, res) {
    return new OK({
      message: 'Publish product successful',
      metadata: await ProductService.publishOneProduct(req.body),
    }).send(res);
  }

  static async unPublishOneProduct(req, res) {
    return new OK({
      message: 'Unpublish product successful',
      metadata: await ProductService.unpublishOneProduct(req.body),
    }).send(res);
  }
}

export default ProductController;
