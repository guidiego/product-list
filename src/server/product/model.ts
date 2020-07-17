import { Document, model, Schema } from 'mongoose';
import { ProductData } from '~/types/entities';

interface IProduct extends ProductData, Document {}

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: String,
  },
  isNewRelease: {
    type: Boolean,
    default: false,
  },
  brand: {
    id: { type: Number, default: '' },
    name: { type: String, default: '' },
    initials: { type: String, default: '' },
  },
  priceFrom: {
    type: Number,
    required: true,
  },
  priceTo: {
    type: Number,
    required: true,
  },
  photoStill: {
    type: String,
    default: '',
  },
});

export const Product = model<IProduct>('Product', ProductSchema);
export default Product;
