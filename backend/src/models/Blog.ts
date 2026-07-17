import { Schema, model, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  content: string;
  tags: string[];
  status: 'Published' | 'Draft';
  coverImage: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' },
    coverImage: { type: String, default: '' },
    author: { type: String, default: 'Prabhat' }
  },
  { timestamps: true }
);

export const Blog = model<IBlog>('Blog', BlogSchema);
