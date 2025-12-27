import { Request, Response } from 'express';
import { Income } from '../models/income';

export const getAllIncomes = async (req: Request, res: Response) => {
  try {
    const incomes = await Income.find().populate('client user');
    res.json(incomes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getIncomeById = async (req: Request, res: Response): Promise<void> => {
  // ...existing code...
  try {
    const income = await Income.findById(req.params.id).populate('client user');
    if (!income) {
      res.status(404).json({ error: 'Income not found' });
      return;
    }
    res.json(income);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = { ...req.body };
    if (body.paymentType && !body.paymentMethod) {
      body.paymentMethod = body.paymentType;
    }
    // Fill required fields with defaults if missing
    if (!body.receiptNumber) body.receiptNumber = Math.floor(Math.random() * 1000000);
    if (!body.date) body.date = new Date();
    if (!body.client) body.client = '613b1c4f1c4ae1a1a1a1a1a1';
    if (!body.amount) body.amount = 0;
    if (!body.vat) body.vat = 0;
    if (!body.paymentMethod) body.paymentMethod = 'cash';
    if (!body.paymentDetails) body.paymentDetails = {};
    const income = new Income(body);
    await income.save();
    res.status(201).json(income);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const income = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!income) {
      res.status(404).json({ error: 'Income not found' });

    }
    res.json(income);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteIncome = async (req: Request, res: Response): Promise<void> => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) {
      res.status(404).json({ error: 'Income not found' });
      return;
    }
    res.json({ message: 'Income deleted' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

