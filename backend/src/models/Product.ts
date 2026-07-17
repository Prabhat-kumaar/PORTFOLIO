import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: string;
  images: string[];
  category: string;
  status: 'Published' | 'Draft';
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' }
  },
  { timestamps: true }
);

export const Product = model<IProduct>('Product', ProductSchema);
