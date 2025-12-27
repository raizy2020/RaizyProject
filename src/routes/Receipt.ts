// import express from 'express';
// import { getAllReceipts, getReceiptById, createReceipt, updateReceipt } from '../controllers/Receipt';

// const router = express.Router();

// router.get('/', getAllReceipts);
// router.get('/:id', getReceiptById);
// router.post('/', createReceipt);
// router.put('/:id', updateReceipt);

// export default router;
import express, { Request, Response, NextFunction } from 'express';
import { 
  getAllReceipts,
  getReceiptById,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  downloadReceiptPdf 
} from '../controllers/Receipt';

const router = express.Router();

// CRUD routes
router.get('/', getAllReceipts);
router.post('/', createReceipt);
router.get('/:id', getReceiptById);
router.put('/:id', updateReceipt);
router.delete('/:id', deleteReceipt);

// PDF download route
router.get('/:id/pdf', downloadReceiptPdf as (req: Request, res: Response, next: NextFunction) => any);

export default router;