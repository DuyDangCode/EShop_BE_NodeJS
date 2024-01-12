import mongoose, { Mongoose } from 'mongoose';

const DOCUMENT_NAME = 'product';
const COLLECTION_NAME = 'products';
const LAPTOP_DOCUMENT = 'laptop';
const LAPTOP_COLLECTION = 'laptops';
const PC_DOCUMENT = 'pc';
const PC_COLLECTION = 'pcs';
const SCREEN_DOCUMENT = 'screen';
const SCREEN_COLLECTION = 'screens';

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      require: true,
    },
    product_thumb: {
      type: String,
      require: true,
    },
    product_description: {
      type: String,
      default: '',
    },
    product_quantity: {
      type: Number,
      require: true,
    },
    product_price: {
      type: Number,
      require: true,
    },
    product_type: {
      type: String,
      require: true,
    },
    product_attributes: {
      type: mongoose.Schema.Types.Mixed,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const laptopSchema = new mongoose.Schema(
  {
    CPU: { type: String },
    display: { type: String },
    RAM: {
      type: String,
    },
    graphics: {
      type: String,
    },
    storage: {
      type: String,
    },
    OS: { type: String },
    battery: {
      type: String,
    },
    weight: { type: String },
    standard: { type: String },
  },
  { timestamps: true, collection: LAPTOP_COLLECTION }
);

const pcSchema = new mongoose.Schema(
  {
    processor: { type: String },
    mainboard: { type: String },
    SSD: { type: String },
    HDD: { type: String },
    power: { type: String },
    case: { type: String },
  },
  { timestamps: true, collection: PC_COLLECTION }
);

const screenSchema = new mongoose.Schema(
  {
    size: { type: String },
    panelType: { type: String },
    refreshRate: { type: String },
    colorDisplay: { type: String },
    synchronizationTechnology: { type: String },
    videoPorts: { type: String },
  },
  { timestamps: true, collection: SCREEN_COLLECTION }
);

export default {
  productModel: mongoose.model(DOCUMENT_NAME, productSchema),
  laptopModel: mongoose.model(LAPTOP_DOCUMENT, laptopSchema),
  pcModel: mongoose.model(PC_DOCUMENT, pcSchema),
  screenModel: mongoose.model(SCREEN_DOCUMENT, screenSchema),
};
