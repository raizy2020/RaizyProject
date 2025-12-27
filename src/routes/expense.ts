// import express, { Request, Response } from 'express';
// import Expense from '../models/Expense';
// import multer from 'multer';
// import path from 'path';

// const router = express.Router();

// // הגדרת אחסון לקבצים
// const storage = multer.diskStorage({
//   destination: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
//     cb(null, path.join(__dirname, '../../uploads'));
//   },
//   filename: (req: express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// // יצירת הוצאה חדשה
// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const expense = new Expense(req.body);
//     await expense.save();
//     res.status(201).json(expense);
//   } catch (err: any) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // העלאת קובץ PDF להוצאה
// router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
//   try {
//     const file = (req as any).file as Express.Multer.File | undefined;
//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }
//     res.status(200).json({ filename: file.filename });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // קבלת כל ההוצאות
// router.get('/', async (req: Request, res: Response) => {
//   try {
//     const expenses = await Expense.find().populate('supplier category');
//     res.json(expenses);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
import express from 'express';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
} from '../controllers/Expense';

const router = express.Router();

router.get('/', getAllExpenses);
router.post('/', createExpense);
router.get('/:id', (req, res) => {
  getExpenseById(req, res);
});
router.put('/:id', (req, res) => {
  updateExpense(req, res);
});
router.delete('/:id', (req, res) => {
  deleteExpense(req, res);
});

export default router;