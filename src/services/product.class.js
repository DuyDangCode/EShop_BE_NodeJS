import { BadRequestError } from '../core/error.res.js'
import products from '../models/product.model.js'
import productRepo from '../models/repositories/product.repo.js'
import { updateNestedObjectParser } from '../utils/index.js'
import inventoryRepo from '../models/repositories/inventory.repo.js'
import { cloudinaryUploader } from '../configs/cloudinary.config.js'
import { decodeBase64ForMulter } from '../configs/multer.config.js'

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_quantity,
    product_price,
    product_type,
    product_attributes,
    originalname,
    buffer,
    userId,
  }) {
    this.product_name = product_name
    this.product_thumb = ''
    this.product_description = product_description
    this.product_quantity = product_quantity
    this.product_price = product_price
    this.product_type = product_type
    this.product_attributes = product_attributes
    this.originalnameImage = originalname
    this.bufferImage = buffer
    this.userId = userId
  }
  async createProduct(id) {
    // this.product_quantity = null;
    const file = decodeBase64ForMulter(
      this.originalnameImage,
      this.bufferImage,
    ).content
    const uploadImageResult = await cloudinaryUploader.upload(file)
    this.product_thumb = uploadImageResult.url

    const newProduct = await products.productModel.create({ ...this, _id: id })
    if (!newProduct) throw new BadRequestError('Create new product fail')
    const newInventory = await inventoryRepo.createInventory({
      inven_productId: newProduct._id,
      inven_stock: newProduct.product_quantity,
      inven_location: 'unKnow',
      inven_import:
        newProduct.product_quantity !== 0
          ? [
              {
                userId: this.userId,
                product_quantity: newProduct.product_quantity,
              },
            ]
          : [],
    })
    if (!newInventory) {
      throw new BadRequestError('Create new inventory fail')
    }

    return newProduct
  }
  async updateProduct({ productId, payload }) {
    const data = payload
    data.product_quantity = undefined

    return await productRepo.updateProductById({
      productId,
      data,
      model: products.productModel,
    })
  }
}

export class Laptop extends Product {
  async createProduct() {
    const newLaptop = await products.laptopModel.create(this.product_attributes)
    if (!newLaptop) throw new BadRequestError('Create new laptop error')
    return await super.createProduct(newLaptop._id)
  }

  async updateProduct(productId) {
    //object parser
    const payload = updateNestedObjectParser(this)

    //update product in child
    if (payload.product_attributes) {
      await productRepo.updateProductById({
        productId,
        payload: payload.product_attributes,
        model: products.laptopModel,
      })
    }
    //update product in parent
    return await super.updateProduct({ productId, payload })
  }
}

export class PC extends Product {
  async createProduct() {
    const newPC = await products.pcModel.create(this.product_attributes)
    if (!newPC) throw new BadRequestError('Create new PC error')
    return await super.createProduct(newPC._id)
  }
  async updateProduct(productId) {
    //object parser
    const payload = updateNestedObjectParser(this)

    //update product in child
    if (payload.product_attributes) {
      await productRepo.updateProductById({
        productId,
        payload: payload.product_attributes,
        model: products.pcModel,
      })
    }
    //update product in parent
    return await super.updateProduct({ productId, payload })
  }
}

export class Screen extends Product {
  async createProduct() {
    const newScreen = await products.screenModel.create(this.product_attributes)
    if (!newScreen) throw new BadRequestError('Create new screen error')
    return await super.createProduct(newScreen._id)
  }
  async updateProduct(productId) {
    //object parser
    const payload = updateNestedObjectParser(this)

    //update product in child
    if (payload.product_attributes) {
      await productRepo.updateProductById({
        productId,
        payload: payload.product_attributes,
        model: products.screenModel,
      })
    }
    //update product in parent
    return await super.updateProduct({ productId, payload })
  }
}
