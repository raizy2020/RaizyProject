import { Request, Response, NextFunction } from 'express';
import { Income } from '../models/income';
import { Expense } from '../models/expense';

export const incomeVsExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, to } = req.query;
    const fromDate = from ? new Date(from as string) : new Date('1970-01-01');
    const toDate = to ? new Date(to as string) : new Date();

    const incomes = await Income.find({ date: { $gte: fromDate, $lte: toDate } });
    const expenses = await Expense.find({ date: { $gte: fromDate, $lte: toDate } });

    res.json({
      incomes,
      expenses
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Add missing endpoints for test compatibility
export const incomeByDate = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    const fromDate = from ? new Date(from as string) : new Date('1970-01-01');
    const toDate = to ? new Date(to as string) : new Date();
    const incomes = await Income.find({ date: { $gte: fromDate, $lte: toDate } });
    res.status(200).json(incomes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const expenseByDate = async (req: Request, res: Response) => {
  try {
    const { from, to } = req.query;
    const fromDate = from ? new Date(from as string) : new Date('1970-01-01');
    const toDate = to ? new Date(to as string) : new Date();
    const expenses = await Expense.find({ date: { $gte: fromDate, $lte: toDate } });
    res.status(200).json(expenses);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const incomeAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, to, client, paymentType } = req.query;
    const match: any = {};
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from as string);
      if (to) match.date.$lte = new Date(to as string);
    }
    if (client) match.client = client;
    if (paymentType) match.paymentType = paymentType;

    const result = await Income.aggregate([
      { $match: match },
      {
        $group: {
          _id: { client: '$client', paymentType: '$paymentType' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const expenseAnalysis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { from, to, category, paymentType } = req.query;
    const match: any = {};
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from as string);
      if (to) match.date.$lte = new Date(to as string);
    }
    if (category) match.category = category;
    if (paymentType) match.paymentType = paymentType;

    const result = await Expense.aggregate([
      { $match: match },
      {
        $group: {
          _id: { category: '$category', paymentType: '$paymentType' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};