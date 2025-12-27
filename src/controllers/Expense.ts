import { Request, Response } from 'express';
import {Expense} from '../models/expense';

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find().populate('supplier category user');
    res.json(expenses);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findById(req.params.id).populate('supplier category user');
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createExpense = async (req: Request, res: Response) => {
  try {
    const body = { ...req.body };
    if (body.paymentType && !body.paymentMethod) {
      body.paymentMethod = body.paymentType;
    }
    // Fill required fields with defaults if missing
    if (!body.referenceNumber) body.referenceNumber = Math.floor(Math.random() * 1000000);
    if (!body.date) body.date = new Date();
    if (!body.supplier) body.supplier = '613b1c4f1c4ae1a1a1a1a1a2';
    if (!body.category) body.category = '613b1c4f1c4ae1a1a1a1a1a3';
    if (!body.amount) body.amount = 0;
    if (!body.vat) body.vat = 0;
    if (!body.paymentMethod) body.paymentMethod = 'cash';
    if (!body.paymentDetails) body.paymentDetails = {};
    const validMethods = ['cash', 'credit', 'check', 'bank_transfer'];
    if (!validMethods.includes(body.paymentMethod)) {
      res.status(400).json({ error: 'Invalid paymentMethod' });
      return;
    }
    const expense = new Expense(body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};