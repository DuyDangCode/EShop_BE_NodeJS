import mongoose, { Mongoose } from 'mongoose';
import slugify from 'slugify';

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
    product_slug: {
      type: String,
    },
    product_type: {
      type: String,
      require: true,
    },
    product_attributes: {
      type: mongoose.Schema.Types.Mixed,
      require: true,
    },
    product_rating: {
      type: Number,
      default: 4.5,
      max: [5, 'Rating must be less than 5'],
      min: [1, 'Rating must be more than 1'],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: {
      type: Array,
      default: [],
    },
    // this not to show
    isDart: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

productSchema.pre('save', function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

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
