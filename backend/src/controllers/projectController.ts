import { Request, Response } from 'express';
import { Project } from '../models/Project.js';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
