import {
  productModel,
  laptopModel,
  pcModel,
  screenModel,
} from '../models/product.model';

class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_quantity,
    product_price,
    product_type,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_quantity = product_quantity;
    this.product_price = product_price;
    this.product_type = product_type;
    this.product_attributes = product_attributes;
  }
  async createProduct(id) {
    return await productModel.create({ ...this, _id: id });
  }
}

export class Laptop extends Product {
  async createProduct() {
    const newLaptop = await laptopModel.create(this.product_attributes).lean();
    if (!newLaptop) throw new BadRequestError('Create new laptop error');
    super.createProduct(newLaptop._id);
  }
}

export class PC extends Product {
  async createProduct() {
    const newPC = await pcModel.create(this.product_attributes).lean();
    if (!newPC) throw new BadRequestError('Create new PC error');
    super.createProduct(newPC._id);
  }
}

export class Screen extends Product {
  async createProduct() {
    const newScreen = await screenModel.create(this.product_attributes).lean();
    if (!newScreen) throw new BadRequestError('Create new screen error');
    super.createProduct(newScreen._id);
  }
}
