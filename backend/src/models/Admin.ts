import { Schema, model, Document } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Admin = model<IAdmin>('Admin', AdminSchema);
