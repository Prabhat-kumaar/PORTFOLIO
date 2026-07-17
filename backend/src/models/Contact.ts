import { Schema, model, Document } from 'mongoose';

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  services: string[];
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  phone: { type: String, required: true },
  country: { type: String, default: '' },
  services: { type: [String], default: [] },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Contact = model<IContact>('Contact', ContactSchema);
