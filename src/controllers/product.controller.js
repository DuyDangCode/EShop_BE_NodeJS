import { HEADERS } from '../constrant/req.constrant.js'
import { BadRequestError } from '../core/error.res.js'
import { CREATED, OK } from '../core/success.res.js'
import ProductService from '../services/product.service.js'
class ProductController {
  static async createProduct(req, res) {
    return new CREATED({
      message: 'Create product successful',
      metadata: await ProductService.createProduct(req.body.product_type, {
        ...req.body,
        ...req.file,
        userId: req.headers[HEADERS.CLIENT],
      }),
    }).send(res)
  }

  static async getAllDraft(req, res) {
    return new OK({
      message: 'Get all product successful',
      metadata: await ProductService.getAllDraft(req.query),
    }).send(res)
  }

  static async getAllProduct(req, res) {
    return new OK({
      message: 'Get all product successful',
      metadata: await ProductService.getAllProduct(req.query),
    }).send(res)
  }

  static async getAllProductPublied(req, res) {
    return new OK({
      message: 'Get all product successful',
      metadata: await ProductService.getAllProductPublished(req.query),
    }).send(res)
  }

  static async publishOneProduct(req, res) {
    return new OK({
      message: 'Publish product successful',
      metadata: await ProductService.publishOneProduct(req.body),
    }).send(res)
  }

  static async unPublishOneProduct(req, res) {
    return new OK({
      message: 'Unpublish product successful',
      metadata: await ProductService.unpublishOneProduct(req.body),
    }).send(res)
  }

  static async search(req, res) {
    return new OK({
      message: 'Search product',
      metadata: await ProductService.search(req.params.keyword),
    }).send(res)
  }

  static async getOneProduct(req, res) {
    return new OK({
      message: 'Get product successful',
      metadata: await ProductService.getOneProduct(req.query),
    }).send(res)
  }
  static async getOnePublisedProduct(req, res) {
    return new OK({
      message: 'Get product successful',
      metadata: await ProductService.getOnePublisedProduct(req.query),
    }).send(res)
  }
  static async getOnePublisedProductBySlug(req, res) {
    return new OK({
      message: 'Get product successful',
      metadata: await ProductService.getOnePublisedProductBySlug({
        ...req.params,
        ...req.query,
      }),
    }).send(res)
  }

  static async updateProduct(req, res) {
    return new OK({
      message: 'Update product successful',
      metadata: await ProductService.updateProduct({
        productId: req.params.productId,
        payload: req.body,
        type: req.body.product_type,
      }),
    }).send(res)
  }

  static async getPublishedProductByCategory(req, res) {
    return new OK({
      message: 'Get product successful',
      metadata: await ProductService.getPublishedProductByCatergory({
        ...req.query,
        ...req.params,
      }),
    }).send(res)
  }
  static async getTotalPublishedProduct(req, res) {
    return new OK({
      message: 'Get total product successful',
      metadata: await ProductService.getTotalPublisedProduct(
        req?.query?.product_type,
      ),
    }).send(res)
  }
}

export default ProductController
