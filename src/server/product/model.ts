import { Document, model, Schema } from 'mongoose';

interface IProduct extends Document {
  title: string;
  description: string;
  isNewRelease?: boolean;
  keywords: string;
  brand: {
    id: number;
    name: string;
    initials: string;
  };
}

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
    required: true,
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
});

export const Product = model<IProduct>('Product', ProductSchema);
export default Product;
