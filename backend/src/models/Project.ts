import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  status: 'Published' | 'Draft';
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    techStack: { type: [String], default: [] },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    image: { type: String, default: '' },
    status: { type: String, enum: ['Published', 'Draft'], default: 'Published' }
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', ProjectSchema);
