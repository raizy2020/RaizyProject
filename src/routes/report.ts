// import express, { Request, Response } from 'express';
// import Income from '../models/Income';
// import Expense from '../models/Expense';

// const router = express.Router();

// // דוח הכנסות מול הוצאות לפי תאריכים
// router.get('/income-vs-expense', async (req: Request, res: Response) => {
//   try {
//     const { from, to } = req.query;
//     const fromDate = from ? new Date(from as string) : new Date('2000-01-01');
//     const toDate = to ? new Date(to as string) : new Date();
//     const incomes = await Income.find({ date: { $gte: fromDate, $lte: toDate } });
//     const expenses = await Expense.find({ date: { $gte: fromDate, $lte: toDate } });
//     res.json({ incomes, expenses });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוח הכנסות לפי לקוח
// router.get('/income-by-client/:clientId', async (req: Request, res: Response) => {
//   try {
//     const incomes = await Income.find({ client: req.params.clientId });
//     res.json(incomes);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוח הכנסות לפי תאריך
// router.get('/income-by-date', async (req: Request, res: Response) => {
//   try {
//     const { from, to } = req.query;
//     const fromDate = from ? new Date(from as string) : new Date('2000-01-01');
//     const toDate = to ? new Date(to as string) : new Date();
//     const incomes = await Income.find({ date: { $gte: fromDate, $lte: toDate } });
//     res.json(incomes);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוח הכנסות לפי סוג תשלום
// router.get('/income-by-payment', async (req: Request, res: Response) => {
//   try {
//     const { paymentType } = req.query;
//     const incomes = await Income.find(paymentType ? { paymentType } : {});
//     res.json(incomes);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוח הוצאות לפי קטגוריה
// router.get('/expense-by-category/:categoryId', async (req: Request, res: Response) => {
//   try {
//     const expenses = await Expense.find({ category: req.params.categoryId });
//     res.json(expenses);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוח הוצאות לפי תאריך
// router.get('/expense-by-date', async (req: Request, res: Response) => {
//   try {
//     const { from, to } = req.query;
//     const fromDate = from ? new Date(from as string) : new Date('2000-01-01');
//     const toDate = to ? new Date(to as string) : new Date();
//     const expenses = await Expense.find({ date: { $gte: fromDate, $lte: toDate } });
//     res.json(expenses);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // דוח הוצאות לפי סוג תשלום
// router.get('/expense-by-payment', async (req: Request, res: Response) => {
//   try {
//     const { paymentType } = req.query;
//     const expenses = await Expense.find(paymentType ? { paymentType } : {});
//     res.json(expenses);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
import express from 'express';
import {
  incomeVsExpense,
  incomeAnalysis,
  expenseAnalysis
} from '../controllers/Report';

const router = express.Router();

router.get('/income-vs-expense', incomeVsExpense);
router.get('/income-analysis', incomeAnalysis);
router.get('/expense-analysis', expenseAnalysis);

export default router;