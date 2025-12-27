// import express, { Request, Response } from 'express';
// import Income from '../models/Income';

// const router = express.Router();

// // יצירת הכנסה חדשה
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const income = new Income(req.body);
//     await income.save();
//     res.status(201).json(income);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // קבלת כל ההכנסות
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const incomes = await Income.find().populate('client');
//     res.json(incomes);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
import express from 'express';
import {
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome
} from '../controllers/Income';

const router = express.Router();

router.get('/', getAllIncomes);
router.post('/', createIncome);
router.get('/:id', (req, res) => {
  getIncomeById(req, res);
});
router.put('/:id', (req, res) => {
  updateIncome(req, res);
});
router.delete('/:id', (req, res) => {
  deleteIncome(req, res);
});

export default router;