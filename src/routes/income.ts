import express, { Request, Response } from 'express';
import Income from '../models/Income';

const router = express.Router();

// יצירת הכנסה חדשה
router.post('/', async (req: Request, res: Response) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json(income);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// קבלת כל ההכנסות
router.get('/', async (req: Request, res: Response) => {
  try {
    const incomes = await Income.find().populate('client');
    res.json(incomes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
