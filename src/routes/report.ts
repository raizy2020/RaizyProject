


import express from 'express';
import {
  incomeVsExpense,
  incomeAnalysis,
  expenseAnalysis,
  incomeByDate,
  expenseByDate
} from '../controllers/report';

const router = express.Router();


router.get('/income-vs-expense', incomeVsExpense);
router.get('/income-analysis', incomeAnalysis);
router.get('/expense-analysis', expenseAnalysis);
router.get('/income-by-date', incomeByDate);
router.get('/expense-by-date', expenseByDate);

export default router;