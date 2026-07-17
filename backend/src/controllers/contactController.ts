import { Request, Response } from 'express';
import { Contact } from '../models/Contact.js';

export const createContact = async (req: Request, res: Response) => {
  try {
    const newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
