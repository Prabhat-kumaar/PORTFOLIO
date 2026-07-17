import { Request, Response } from 'express';
import { Blog } from '../models/Blog.js';

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = new Blog(req.body);
    const saved = await newBlog.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Blog post not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
