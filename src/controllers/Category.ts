import { Request, Response } from 'express';
import { Category } from '../models/category';

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if id is a valid MongoDB ObjectId
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ error: 'Invalid category id format' });
      return;
    }
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = { ...req.body };
    // Fill required fields with defaults if missing
    if (!body.name) body.name = 'defaultCategory_' + Math.floor(Math.random() * 1000000);
    if (!body.description) body.description = '';
    const existing = await Category.findOne({ name: body.name });
    if (existing) {
      res.status(400).json({ error: 'Category already exists' });
      return;
    }
    const category = new Category(body);
    await category.save();
    res.status(201).json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ message: 'Category deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};